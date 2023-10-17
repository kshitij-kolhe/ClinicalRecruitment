import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentComponent } from './recruitment.component';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import createSpyObj = jasmine.createSpyObj;
import {EnrollmentService} from "../service/enrollment.service";
import {ModifyService} from "../service/modify.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";

describe('RecruitmentComponent', () => {
  let component: RecruitmentComponent;
  let fixture: ComponentFixture<RecruitmentComponent>;
  let enrollmentService: any;
  let html: DebugElement;

  beforeEach(() => {

    enrollmentService = createSpyObj('EnrollmentService', ['enrollPatient']);

    TestBed.configureTestingModule({
      declarations: [RecruitmentComponent],
      imports: [ReactiveFormsModule,
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
      providers: [
        {provide: EnrollmentService, useValue: enrollmentService},
      ]
    });
    fixture = TestBed.createComponent(RecruitmentComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
