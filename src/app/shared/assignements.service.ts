import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { HttpClient } from '@angular/common/http';
import { ResponseMessage } from '../models/response-message.model';
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
  // uri: String = 'http://localhost:8010/api/assignments'
  uri: String = 'https://assignments-back.onrender.com/api/assignments'
  msg = new Subject<any>()

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  getAssignments(filter): Observable<any> {
    console.log("filter", filter)
    let search = '?'
    // ?professeur=Cabrio&nom=swag
    for (let element in filter) {
      filter[element] ? search += `${element}=${filter[element]}&` : search += ''
    }
    return this.http.get<Assignment[]>(`${this.uri}${search}`)
  }

  addAssignments(assignment: Assignment): Observable<any> {
    return this.http.post(`${this.uri}/`, assignment, { responseType: 'text' })
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put(`${this.uri}/${assignment._id}`, assignment, { responseType: 'text' })
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(`${this.uri}/${assignment._id}`, { responseType: 'text' })
  }

  getAssignment(id: String): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.uri}/${id}`)
  }
}
