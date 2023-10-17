import { TestBed } from '@angular/core/testing';

import { ModifyService } from './modify.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpParams} from "@angular/common/http";
import {Patient} from "../Modal/Patient";

describe('ModifyService', () => {
  let service: ModifyService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ModifyService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update patient info', () => {

    let parameters = new HttpParams();
    parameters = parameters.set("name", "different name");

    let patient: Patient = {id: 8, name: "green yellow", age: 46, gender: "random", medicalCondition: "random condition", enrollDate: "2023-09-09"};

    service.modifyPatientInfo(8, parameters).subscribe(data => {
      expect(data.status).toEqual(200);
      expect(data.body).toEqual(patient);
    })

    let request = httpTesting.expectOne("http://localhost:8080/patient/8?name=different%20name");

    expect(request.request.method).toEqual("PUT");

    request.flush(patient, {status: 200, statusText: "OK"});

    httpTesting.verify();
  });

  it('should delete patient record', () => {
    service.deletePatient(6).subscribe(data => {
      expect(data.status).toEqual(204);
    });

    let request = httpTesting.expectOne("http://localhost:8080/patient/6");

    expect(request.request.method).toEqual("DELETE");

    request.flush(null, {status: 204, statusText: "No Content"});

    httpTesting.verify();
  });


});
