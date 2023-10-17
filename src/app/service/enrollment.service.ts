import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PatientInfo} from "../Modal/PatientInfo";


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  public enrollPatient(patient: PatientInfo): Observable<any> {

    return this.http.post("http://localhost:8080/patient", patient, {observe: 'response'});
  }
}
