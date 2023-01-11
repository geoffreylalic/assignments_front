import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { HttpClient } from '@angular/common/http';
import { ResponseMessage } from '../models/response-message.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {
  uri: String = 'https://assignments-back.onrender.com/api/professors/'
  msg = new Subject<ResponseMessage>()

  constructor(private http: HttpClient,) { }

  getProfessors(): Observable<Assignment[]> {
    return this.http.get<any>(`${this.uri}`)
  }
}
