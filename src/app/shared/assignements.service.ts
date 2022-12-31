import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { HttpClient } from '@angular/common/http';
import { ResponseMessage } from './response-message.model';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  statuts: String[] = [
    'à faire',
    'en cours',
    'finit',
    'rendu',
  ]
  assignments: Assignment[] = []
  uri: String = 'http://localhost:8010/api/assignments'
  msg = new Subject<ResponseMessage>()

  constructor(private http: HttpClient,) { }

  getAssignments(filter): Observable<any> {
    console.log("filter", filter)
    let search = '?'
    // ?professeur=Cabrio&nom=swag
    for (let element in filter) {
     filter[element] ? search += `${element}=${filter[element]}&` : search += ''
    }
    console.log("search ", search)
    return this.http.get<Assignment[]>(`${this.uri}${search}`)
  }

  addAssignments(assignment: Assignment): Observable<any> {
    return this.http.post<any>(`${this.uri}/`, assignment,)
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put(`${this.uri}/${assignment._id}`, assignment)
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(`${this.uri}/${assignment._id}`)
  }

  getAssignment(id: String): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.uri}/${id}`)
  }
}
