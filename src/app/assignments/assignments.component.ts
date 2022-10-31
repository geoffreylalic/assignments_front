import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AssignmentsService } from '../shared/assignements.service'
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Devoirs";
  assignmentSelectionne!: Assignment | undefined;

  formVisible = false;

  assignmentsEnCours: Assignment[] = []
  assignmentsPasCommence: Assignment[] = []
  assignmentsTermine: Assignment[] = []

  constructor(private assignmentsService: AssignmentsService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("appelé à l'initialisation du composant");
    this.assignmentsService.getAssignments().subscribe((assignments => {
      assignments.map(assignment => {
        if (assignment.statut === 'pas commencé') {
          this.assignmentsPasCommence.push(assignment)
        } else if (assignment.statut === 'en cours') {
          this.assignmentsEnCours.push(assignment)
        }
        else if (assignment.statut === 'terminé') {
          this.assignmentsTermine.push(assignment)
        }
      })
    }))
  }

  assignmentClique(assignment: Assignment) {
    console.log("assignmentClique : " + assignment.nom);
    this.assignmentSelectionne = assignment;
    // this.router.navigate[`assignment/${assignment.id}`]
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  onNouvelAssignment(nouvelAssignment: Assignment) {
    this.assignmentsService.addAssignments(nouvelAssignment).subscribe(message => {
      this.formVisible = false;
    })
  }
}
