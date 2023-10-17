import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Patient} from "../Modal/Patient";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {InquiryService} from "../service/inquiry.service";
import {Observer} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {ModifyService} from "../service/modify.service";
import {HttpParams, HttpResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit, AfterContentInit{

  firstName= new FormControl('', [Validators.required]);
  age= new FormControl<number | null>(null, [Validators.max(100), Validators.min(0),Validators.required]);
  medicalCondition= new FormControl<string | null>(null, Validators.required);
  gender= new FormControl<string | null>(null, Validators.required);

  medicalConditions: String[] = ["Diabetes", "Migraine", "Tumor", 'Arthritis', 'Hypertension', 'Asthma'];
  genders: String[] = ["Male", "Female"];

  selectedRow: number;
  patients: MatTableDataSource<Patient>;
  fetchingPatients = false;

  displayedColumns = ["id", "name", "age", "gender", "medicalCondition", "enrollDate", 'action'];

  @ViewChild(MatSort) sort: MatSort;

  rootPatient: Observer<Patient[]> = {
    next: (data: Patient[]) => {
      this.patients = new MatTableDataSource<Patient>(data);
      this.patients.sort = this.sort;
    },
    error: (err) => {},
    complete: () => {
      this.fetchingPatients = false;
    }};

  rootPatientUpdate: Observer<HttpResponse<Patient>> = {
    next: (data: HttpResponse<Patient>) => {
      if (data.status === 200) {
        let patient: Patient = data.body!;
        this.snackbar.open("Patient info updated", "close", {duration: 4000});
        let patientIndex = this.patients.data.findIndex((p, i) => {return p.id === patient.id});

        this.patients.data[patientIndex] = patient;
      }
    }, error: (err) => {},
    complete: () => {
        this.patients = new MatTableDataSource<Patient>(this.patients.data);
        this.fetchingPatients = false;
    }
  }

  rootPatientDelete: Observer<HttpResponse<any>> = {
    next: (data: HttpResponse<any>) => {
      if (data.status === 404) {
        this.snackbar.open("Could not find patient", "close", {duration: 3000});
      }

      if (data.status === 204) {
        this.snackbar.open("Patient removed from clinical trial", "close", {duration: 3000});
      }
    }, error: err => {}, complete: () => {
      this.fetchingPatients = false;
    }
  };

  ngOnInit(): void {
  }

  constructor(private inquiryService: InquiryService, private modifyService: ModifyService, private snackbar: MatSnackBar) {
  }

  ngAfterContentInit(): void {
    this.fetchingPatients = true;
    this.inquiryService.getAllEnrolledPatients().subscribe(this.rootPatient);
  }

  editRow(i: number, record: Patient) {
    this.selectedRow = i;
    this.firstName.setValue(record.name.toString());
    this.age.setValue(record.age);
    this.gender.setValue(record.gender);
    this.medicalCondition.setValue(record.medicalCondition);
  }

  update(id: number) {
    if (this.age.hasError('required') || this.firstName.hasError('required') || this.medicalCondition.hasError('required') || this.gender.hasError('required')) {
      this.snackbar.open("Invalid information", "close", {duration: 3000});
      return;
    }

    this.fetchingPatients = true;
    let updatedParameters = new HttpParams();

    if (this.firstName.dirty) {
      updatedParameters = updatedParameters.set('name', this.firstName.value!);
    }
    if (this.age.dirty) {
      updatedParameters = updatedParameters.set('age', this.age.value!);
    }
    if (this.gender.dirty) {
      updatedParameters = updatedParameters.set('gender', this.gender.value!);
    }
    if (this.medicalCondition.dirty) {
      updatedParameters = updatedParameters.set('medicalCondition', this.medicalCondition.value!);
    }

    this.modifyService.modifyPatientInfo(id, updatedParameters).subscribe(this.rootPatientUpdate);

    this.selectedRow = -this.selectedRow-1;
  }

  deleteRow(id: number) {
    this.fetchingPatients = true;
    this.modifyService.deletePatient(id).subscribe(this.rootPatientDelete);
    this.patients.data = this.patients.data.filter(p => p.id !== id);
  }

}
