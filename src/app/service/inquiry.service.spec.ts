import { TestBed } from '@angular/core/testing';

import { InquiryService } from './inquiry.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Patient} from "../Modal/Patient";

describe('InquiryService', () => {
  let service: InquiryService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InquiryService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all enrolled patients', () => {

    let patients: Patient[] = [{id: 1, name: "red yellow", age: 98, gender: "random", medicalCondition: "random condition", enrollDate: "2023-09-09"},
    {id: 8, name: "green yellow", age: 46, gender: "random", medicalCondition: "random condition", enrollDate: "2023-09-09"},
    {id: 65, name: "blue yellow", age: 22, gender: "random", medicalCondition: "random condition", enrollDate: "2023-09-09"}];

    service.getAllEnrolledPatients().subscribe(data => {
      expect(data.length).toEqual(3);
      expect(data[0]).toBe(patients[0]);
      expect(data[1]).toBe(patients[1]);
      expect(data[2]).toBe(patients[2]);
    })

    let request = httpTesting.expectOne("http://localhost:8080/patients");

    expect(request.request.method).toBe("GET");

    request.flush(patients);

    httpTesting.verify();
  });
});
