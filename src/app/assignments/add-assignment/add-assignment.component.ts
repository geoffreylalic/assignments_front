import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  // Pour le formulaire
  nomDevoir = "";
  dateDeRendu!: Date;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("onSubmit : " + this.nomDevoir +
      " date de rendu : " + this.dateDeRendu);

    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.statut = 'false';
    // le tableau est chez le papa comment faire ?
    //this.assignments.push(nouvelAssignment);

    this.nouvelAssignment.emit(nouvelAssignment);
  }

}
