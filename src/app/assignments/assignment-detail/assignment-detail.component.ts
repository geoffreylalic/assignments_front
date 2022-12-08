import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignements.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  id: String = ''
  assignment: Assignment = new Assignment()
  isLoading: Boolean = true
  errorMessage: String = ''

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    console.log("id ", this.id)
    this.getAssignment()
  }

  getAssignment() {
    this.isLoading = true
    this.assignmentsService.getAssignment(this.id).subscribe((assignment) => {
      console.log("ici ", assignment)
      this.assignment = assignment
      this.assignment.dateDeRendu = this.formatDate(assignment.dateDeRendu)
      this.isLoading = false
    },
      (error) => {
        console.log("error --- ", error)
        if (error) {
          this.errorMessage = 'Network error'
          console.log("message error", this.errorMessage)
        }
        this.isLoading = true
      })
    console.log("fin")
  }

  formatDate(date): any{
    if (date === null){
      return 'pas de date'
    }
    let d = new Date(date)
    return `${d.getDate().toString().padStart(2,'0')}/${d.getMonth().toString().padStart(2,'0')}/${d.getFullYear()}`;

  }

  onEditAssignment(assignment: Assignment) {
    this.router.navigateByUrl(`assignment/${assignment._id}/edit?id=oui`,)
  }

  onAssignmentRendu() {
    // this.router.navigate(['/home']);
  }

  onDeleteAssignment() {
  }

}
