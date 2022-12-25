import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AssignmentsService } from '../shared/assignements.service'
import { Assignment } from './assignment.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';


export interface DialogData {
  assignment: Assignment;
}
@Injectable()
export class DataService {
  assignment: Assignment
}

@Component({
  template: ''
})
export class DialogEntryComponent {
  constructor(public dialog: MatDialog, private router: Router,
    public route: ActivatedRoute) {
    this.openDialog();
  }
  openDialog(): void {
    console.log("clicked open dialog")
    const dialogRef = this.dialog.open(AssignmentDetailComponent, {
      width: '450px',
      data: this.route
    },
    );
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  loading: boolean = false;
  searchValue:String = null;
  formVisible = false;
  search= {
    name: null,
    professor:null,
    aFaire : false,
    enCours: false,
    finit: false,
    rendu:false,
  }

  assginments = {
    assignmentsAFaire: <Assignment[]>[],
    assignmentsEnCours: <Assignment[]>[],
    assignmentsRendu: <Assignment[]>[],
    assignmentsTermine: <Assignment[]>[],
    
  }

  constructor(private assignmentsService: AssignmentsService,
    private router: Router, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    console.log("appelé à l'initialisation du composant");
    this.getAssignments()
  }

  getAssignments() {
    this.assginments.assignmentsAFaire = []
    this.assginments.assignmentsEnCours = []
    this.assginments.assignmentsTermine = []
    this.assginments.assignmentsRendu = []
    this.assignmentsService.getAssignments().subscribe((assignments => {
      assignments.map(assignment => {
        if (assignment.statut === 'à faire') {
          this.assginments.assignmentsAFaire.push(assignment)
        } else if (assignment.statut === 'en cours') {
          this.assginments.assignmentsEnCours.push(assignment)
        }
        else if (assignment.statut === 'finit') {
          this.assginments.assignmentsTermine.push(assignment)
        }
        else if (assignment.statut === 'rendu') {
          this.assginments.assignmentsRendu.push(assignment)
        }
      })
    }))
  }

  handleDelete(assignment) {
    this.assignmentsService.deleteAssignment(assignment).subscribe(msg => {
      this.loading = true
      console.log("delted data", msg)
      this.getAssignments()
      this.loading = false
      this.assignmentsService.msg.next(msg)
    },
      (error) => {
        this.assignmentsService.msg.next(error)
      })
    console.log("delete clicked", assignment)
  }

  handlesearch(){
    console.log("clicked search ---")
  }

}