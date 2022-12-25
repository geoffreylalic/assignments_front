import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { HttpClient } from '@angular/common/http';
import { ResponseMessage } from './response-message.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {
  uri: String = 'http://localhost:8010/api/professors/'
  msg = new Subject<ResponseMessage>()

  constructor(private http: HttpClient,) { }

  getProfessors(): Observable<Assignment[]> {
    return this.http.get<any>(`${this.uri}`)
  }
}
