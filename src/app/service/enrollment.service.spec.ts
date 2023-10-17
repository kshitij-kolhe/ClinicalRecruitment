import { TestBed } from '@angular/core/testing';

import { EnrollmentService } from './enrollment.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpResponse} from "@angular/common/http";
import {PatientInfo} from "../Modal/PatientInfo";

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(EnrollmentService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should enroll patient for clinical trial', () => {

    let patient: PatientInfo = {name: 'Testing', age: 23, gender: 'Male', medicalCondition: "Random condition"};

    service.enrollPatient(patient).subscribe((data: HttpResponse<any>) => {
      expect(data.status === 201);
    });

    let request = httpTesting.expectOne("http://localhost:8080/patient");

    expect(request.request.method).toEqual("POST");

    request.flush(null, {status: 201, statusText: "Created"});

    httpTesting.verify();
  });
});
