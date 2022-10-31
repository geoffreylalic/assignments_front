import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  statuts: string[] = [
    'pas commencé',
    'en cours',
    'terminé'
  ]
  assignments: Assignment[] = [
    {
      id:0,
      nom: 'Devoir Angular de Mr Buffa',
      professeur: 'M. Buffa',
      dateDeRendu: new Date('2022-11-30'),
      statut: 'pas commencé',
      description: "j'ai preque terminé",
    }, 
    {
      id:1,
      nom: 'Devoir Angular de Mr Buffa',
      professeur: 'M. Buffa',
      dateDeRendu: new Date('2022-11-30'),
      statut: 'pas commencé',
      description: "j'ai preque terminé",
    },
    {
      id:2,
      nom: 'Devoir WebComponents de Mr Buffa',
      professeur: 'M. Buffa',
      dateDeRendu: new Date('2022-09-30'),
      statut: 'en cours',
      description: "Quelle est cette chose ? ",
    },
    {
      id:3,
      nom: 'Devoir WebComponents de Mr Buffa',
      professeur: 'M. Buffa',
      dateDeRendu: new Date('2022-09-30'),
      statut: 'en cours',
      description: "Quelle est cette chose ? ",
    },
    {
      id:4,
      nom: 'Devoir BD de Mr Mopolo',
      professeur: 'M. Mopolo',
      dateDeRendu: new Date('2022-09-30'),
      statut: 'terminé',
      description: "Comment ca mon reufs ?",
    },
    {
      id:5,
      nom: 'Devoir BD de Mr Mopolo',
      professeur: 'M. Mopolo',
      dateDeRendu: new Date('2022-09-30'),
      statut: 'terminé',
      description: "Comment ca mon reufs ?",
    }
  ]

  constructor() { }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments)
  }

  addAssignments(assignment: Assignment): Observable<string> {
    this.assignments.push(assignment)
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
