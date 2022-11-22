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
      console.log('ici', assignment)
      this.assignment = assignment
      // this.isLoading = false
    })
    console.log("fin")
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
