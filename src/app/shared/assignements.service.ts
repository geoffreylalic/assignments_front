import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { HttpClient } from '@angular/common/http';
import { ResponseMessage } from './response-message.model';
import { LocalStorageService } from './local-storage.service';
import { HttpHeaders } from '@angular/common/http';
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
  msg = new Subject<any>()
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('x-access-token', JSON.parse(this.localStorage.get('auth')).token);

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  getAssignments(filter): Observable<any> {
    console.log("filter", filter)
    let search = '?'
    // ?professeur=Cabrio&nom=swag
    for (let element in filter) {
      filter[element] ? search += `${element}=${filter[element]}&` : search += ''
    }
    console.log("search ", search)
    return this.http.get<Assignment[]>(`${this.uri}${search}`, { headers: this.headers })
  }

  addAssignments(assignment: Assignment): Observable<any> {
    return this.http.post<any>(`${this.uri}/`, assignment, { headers: this.headers })
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put(`${this.uri}/${assignment._id}`, assignment, { headers: this.headers })
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(`${this.uri}/${assignment._id}`, { headers: this.headers })
  }

  getAssignment(id: String): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.uri}/${id}`, { headers: this.headers })
  }
}
