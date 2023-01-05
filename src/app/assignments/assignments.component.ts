import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AssignmentsService } from '../shared/assignements.service'
import { Assignment } from '../models/assignment.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { PageEvent } from '@angular/material/paginator';

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
  formVisible = false;
  filter = {
    nom: null,
    professeur: null,
    page: 1,
    pageSize: 10,
    statuts: []
  }
  pageSizeOptions = [5, 10, 20]
  total = 0
  pageEvent: PageEvent;
  statuts = {
    aFaire: false,
    enCours: false,
    finit: false,
    rendu: false,
  }
  assignment = {
    assignmentsAFaire: <Assignment[]>[],
    assignmentsEnCours: <Assignment[]>[],
    assignmentsTermine: <Assignment[]>[],
    zassignmentsRendu: <Assignment[]>[],
  }

  constructor(private assignmentsService: AssignmentsService, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getAssignments()
  }

  getAssignments() {
    this.loading = true
    this.assignment.assignmentsAFaire = []
    this.assignment.assignmentsEnCours = []
    this.assignment.assignmentsTermine = []
    this.assignment.zassignmentsRendu = []
    this.assignmentsService.getAssignments(this.filter).subscribe((res => {
      this.total = res.total
      res.assignments.map(assignment => {
        if (assignment.statut === 'à faire') {
          this.assignment.assignmentsAFaire.push(assignment)
        } else if (assignment.statut === 'en cours') {
          this.assignment.assignmentsEnCours.push(assignment)
        }
        else if (assignment.statut === 'finit') {
          this.assignment.assignmentsTermine.push(assignment)
        }
        else if (assignment.statut === 'rendu') {
          this.assignment.zassignmentsRendu.push(assignment)
        }
      })
    }), () => this.loading = false,)
  }

  handleDelete(assignment) {
    this.assignmentsService.deleteAssignment(assignment).subscribe(msg => {
      this.getAssignments()
      this.assignmentsService.msg.next(msg)
    },
      (error) => {
        this.assignmentsService.msg.next(error)
      })
  }

  handlesearch() {
    console.log("clicked search ---")
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.filter.pageSize = e.pageSize;
    this.filter.page = e.pageIndex;
    this.getAssignments()
  }

  filteringStatuts(statut: String) {
    if (this.assignmentsService.statuts.includes(statut) && this.filter.statuts.includes(statut)) {
      const index = this.filter.statuts.indexOf(statut)
      this.filter.statuts.splice(index, 1)
    } else {
      this.filter.statuts.push(statut)
    }
    this.getAssignments()
  }
}