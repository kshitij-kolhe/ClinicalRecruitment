import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../Modal/Patient";

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  public getAllEnrolledPatients(): Observable<Patient[]> {

    return this.http.get<Patient[]>("http://localhost:8080/patients");
  }
}
