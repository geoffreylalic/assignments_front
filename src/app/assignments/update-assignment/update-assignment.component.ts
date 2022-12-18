import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignements.service';
import { Assignment } from '../assignment.model';

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
  statuts = ['à faire', 'en cours', 'terminé']


  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getAssignment()
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