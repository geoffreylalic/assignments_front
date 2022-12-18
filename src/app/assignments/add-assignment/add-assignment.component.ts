import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignements.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  // Pour le formulaire
  nom = "";
  professeur = "";
  statuts = ['à faire', 'en cours', 'terminé']
  statut = ''
  description = '';
  dateDeRendu!: Date;
  constructor(private assignmentService: AssignmentsService, private _assignmentsService: AssignmentsService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("onSubmit : " + this.nom +
      " date de rendu : " + this.dateDeRendu);
    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.statut = this.statut;
    nouvelAssignment.professeur = this.professeur;
    nouvelAssignment.description = this.description;
    this.assignmentService.addAssignments(nouvelAssignment).subscribe(msg => {
      console.log("data in ", msg)
      this._assignmentsService.msg.next(msg)
    })
    this.router.navigate([''], {relativeTo: this.route})
  }

}
