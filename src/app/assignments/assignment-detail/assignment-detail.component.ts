import { CdkPortal } from '@angular/cdk/portal';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignements.service';
import { Assignment } from '../assignment.model';
import { DataService } from '../assignments.component';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  id: any = ''
  assignment: Assignment = new Assignment()
  isLoading: Boolean = true
  errorMessage: String = ''
  activeRoute: any

  constructor(private assignmentsService: AssignmentsService,
    private router: Router,
    private dialogRef: MatDialogRef<AssignmentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: { route: ActivatedRoute }
  ) {
    this.activeRoute = dialogData
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot

    console.log("id active route", this.activeRoute.snapshot.params['id'])
    this.id = this.activeRoute.snapshot.params['id']

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

  formatDate(date): any {
    if (date === null) {
      return 'pas de date'
    }
    let d = new Date(date)
    return `${d.getDate().toString().padStart(2, '0')}/${d.getMonth().toString().padStart(2, '0')}/${d.getFullYear()}`;

  }

  handleDelete(id) {
    console.log('data', id)
    this.router.navigate(['/assignment', id, 'edit'], { relativeTo: this.activeRoute });
    this.dialogRef.close()
  }
}
