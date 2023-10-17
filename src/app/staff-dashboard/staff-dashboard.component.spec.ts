import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashboardComponent } from './staff-dashboard.component';
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {InquiryService} from "../service/inquiry.service";
import createSpyObj = jasmine.createSpyObj;
import {ModifyService} from "../service/modify.service";
import {Observable, of, Subject} from "rxjs";
import {Patient} from "../Modal/Patient";
import {HttpResponse} from "@angular/common/http";

describe('StaffDashboardComponent', () => {
  let component: StaffDashboardComponent;
  let fixture: ComponentFixture<StaffDashboardComponent>;
  let inquiryService: any;
  let modifyService: any;
  let patients: Patient[];

  beforeEach(() => {

    inquiryService = createSpyObj('InquiryService', ["getAllEnrolledPatients"]);
    modifyService = createSpyObj('ModifyService', ["modifyPatientInfo", "deletePatient"]);

    patients = [{id: 1, name: "red yellow", age: 98, gender: "random", medicalCondition: "random condition", enrollDate: "2023-09-09"},
            {id: 8, name: "green yellow", age: 46, gender: "random", medicalCondition: "random condition", enrollDate: "2023-09-09"},
            {id: 65, name: "blue yellow", age: 22, gender: "random", medicalCondition: "random condition", enrollDate: "2023-09-09"}];

    inquiryService.getAllEnrolledPatients.and.returnValue(of(patients));

    TestBed.configureTestingModule({
      declarations: [StaffDashboardComponent],
      imports: [ ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatTooltipModule,
        MatSortModule,
        FormsModule,
        MatSnackBarModule ],
      providers: [ {provide: InquiryService, useValue: inquiryService},
        {provide: ModifyService, useValue: modifyService},
        MatSnackBar,
      ]
    });
    fixture = TestBed.createComponent(StaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all enrolled patients after content initialization', () => {

    expect(inquiryService.getAllEnrolledPatients).toHaveBeenCalledTimes(1);

    expect(component.patients.data).toEqual(patients);
  });

  it('should update patient info on click update', () => {
    let patient: Patient = {id: 65, name: "blue yellow", age: 22, gender: "random", medicalCondition: "random condition", enrollDate: "2023-09-09"};

    modifyService.modifyPatientInfo.and.returnValue(of(patient));

    component.firstName.setValue('blue yellllow');
    component.age.setValue(92);
    component.gender.setValue('Male');
    component.medicalCondition.setValue('random');
    component.update(65);

    expect(modifyService.modifyPatientInfo).toHaveBeenCalledTimes(1);
  });

  it('should delete patient info on click remove', () => {
    component.patients.data = patients;

    let response: Partial<HttpResponse<any>> = {status: 204, statusText: 'OK'};

    modifyService.deletePatient.and.returnValue(of(response));

    component.deleteRow(patients[1].id);

    expect(modifyService.deletePatient).toHaveBeenCalledTimes(1);
    expect(component.patients.data.length).toEqual(patients.length - 1);
  });

});
