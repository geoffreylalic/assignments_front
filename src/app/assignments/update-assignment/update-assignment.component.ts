import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignements.service';
import { ProfessorsService } from 'src/app/shared/professors.service';
import { Assignment } from '../../models/assignment.model';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements OnInit {
  isLoading: boolean = false
  assignment: Assignment = new Assignment()
  errorMessage: string = null
  id: string = null
  statuts = ['à faire', 'en cours', 'finit', 'rendu']
  professors = []


  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private professorsService: ProfessorsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getAssignment()
    this.professorsService.getProfessors().subscribe((res) => this.professors = res)
  }

  getAssignment() {
    this.isLoading = true
    this.assignmentsService.getAssignment(this.id).subscribe((assignment) => {
      this.assignment = assignment
    },
      (error) => {
        if (error) {
          this.assignmentsService.msg.next(error)
        }
      })
    this.isLoading = false
  }

  onConfirm() {
    this.isLoading = true
    this.assignmentsService.updateAssignment(this.assignment).subscribe((msg) => {
      this.assignmentsService.msg.next(msg)
    },
      (error) => {
        if (error) {
          this.assignmentsService.msg.next(error)
        }
      })
    this.isLoading = false

    this.router.navigate([''], { relativeTo: this.route })
  }

}
