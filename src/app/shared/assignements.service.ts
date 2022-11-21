import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
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

  getAssignments(): Observable<any> {
    return from(
      new Promise((resolve, reject) => {
        HTTP.get("/assignments/",)
          .then((res) => {
            this.assignments = res.data
            resolve(this.assignments)
          })
          .catch((e) => {
            console.error(e)
            reject(e)
          })
      })
    )
  }

  addAssignments(assignment: Assignment): Observable<string> {
    new Promise((resolve, reject) => {
      HTTP.post("/assignments/", {
        nom: assignment.nom,
        professeur: assignment.professeur,
        dateDeRendu: assignment.dateDeRendu,
        statut: assignment.statut,
        description: assignment.description,
      })
        .then((res) => {
          console.log(res)
          resolve(res)
        })
        .catch((e) => {
          console.error(e)
          reject(e)
        })
    })
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

  getAssignment(id: String): Observable<any> {
    let assignment = new Assignment();
    return from(
      new Promise((resolve, reject) => {
        HTTP.get(`/assignment/${id}`,)
          .then((res) => {
            assignment._id = res.data._id
            assignment.nom = res.data.nom
            assignment.professeur = res.data.professeur
            assignment.statut = res.data.statut
            assignment.description = res.data.description
            resolve(assignment)
          })
          .catch((e) => {
            console.error(e)
            reject(e)
          })
      })
    )
  }


}
