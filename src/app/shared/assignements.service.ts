import { Injectable } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { HTTP } from '../utils/http-common'
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  statuts: string[] = [
    'à faire',
    'en cours',
    'terminé'
  ]
  assignments: Assignment[] = []
  uri: String = '  http://localhost:8010/api/assignments'
  msg = new Subject<any>()

  constructor(private http: HttpClient, ) { }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.uri}`)
  }

  addAssignments(assignment: Assignment): Observable<any> {
    return this.http.post<any>(`${this.uri}/`, assignment, )
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
