import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignements.service';
import { ProfessorsService } from 'src/app/shared/professors.service';
import { Assignment } from '../../models/assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  // Pour le formulaire
  nom = null;
  professeur = null;
  statuts = ['à faire', 'en cours', 'finit', 'rendu']
  statut = null;
  description = null;
  dateDeRendu!: Date;
  subject = null;
  professors = []
  constructor(private assignmentService: AssignmentsService, private router: Router, private route: ActivatedRoute, private professorsService: ProfessorsService ) { }

  ngOnInit(): void {
    this.professorsService.getProfessors().subscribe((res) => this.professors=res)
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
    nouvelAssignment.subject = this.subject;
    this.assignmentService.addAssignments(nouvelAssignment).subscribe(msg => {
      this.assignmentService.msg.next(msg)
    }, (error)=> {
      this.assignmentService.msg.next(error)
    })
    this.router.navigate([''], {relativeTo: this.route})
  }

}
