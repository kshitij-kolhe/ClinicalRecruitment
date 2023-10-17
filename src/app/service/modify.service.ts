import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../Modal/Patient";

@Injectable({
  providedIn: 'root'
})
export class ModifyService {

  constructor(private http: HttpClient) {

  }

  public modifyPatientInfo(id: number, parameters: HttpParams): Observable<HttpResponse<Patient>> {

    return this.http.put<Patient>("http://localhost:8080/patient/" + id, null, {params: parameters, observe: "response"});
  }

  public deletePatient(id: number): Observable<HttpResponse<any>> {
    return this.http.delete("http://localhost:8080/patient/" + id, {observe: "response"});
  }
}
