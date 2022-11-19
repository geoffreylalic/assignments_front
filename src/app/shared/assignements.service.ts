import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { HTTP } from '../utils/http-common'
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  statuts: string[] = [
    'pas commencé',
    'en cours',
    'terminé'
  ]
  assignments: Assignment[] = []

  constructor() { }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments)
  }

  addAssignments(assignment: Assignment): Observable<string> {
    HTTP.post("/assignments/", {
      nom: assignment.nom,
      professeur: assignment.professeur,
      dateDeRendu: assignment.dateDeRendu,
      statut: assignment.statut,
      description: assignment.description,
    }).then((res)=>{console.log(res)})
    return of('ajout réussi')
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    return of("l'assignment a été supprimé")
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    //todo: change with firebase 
    let index = this.assignments.indexOf(assignment)
    this.assignments.splice(index, 1)
    return of('Assignment supprimer')
  }


}
