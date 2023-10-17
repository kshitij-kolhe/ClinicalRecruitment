import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {EnrollmentService} from "../service/enrollment.service";
import {PatientInfo} from "../Modal/PatientInfo";
import {Observer} from "rxjs";
import {HttpResponse} from "@angular/common/http";



@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent {

  enrollForm = new FormGroup( {
    firstName: new FormControl('', [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    medicalCondition: new FormControl<string | null>(null, Validators.required),
    gender: new FormControl<string | null>(null, Validators.required)
  });



  medicalConditions: String[] = ["Diabetes", "Migraine", "Tumor", 'Arthritis', 'Hypertension', 'Asthma'];
  genders: String[] = ["Male", "Female"];

  created: boolean = false;
  existed: boolean = false;
  errorCreating: boolean = false;
  formInvalid = false;

  listener: Observer<HttpResponse<any>> = {
    next: (data: HttpResponse<any>) => {
      if (data.status == 201) {
        this.created = true;
      }else if (data.status == 200) {
        this.existed = true;
      }
    },
    error: (err) => {
      this.errorCreating = true;
    },
    complete: () => {
      setTimeout(() => {
        this.created = false;
        this.existed = false;
        this.errorCreating = false;
      }, 5000);
    }
  }

  constructor(private enrollmentService: EnrollmentService) {
  }

  submit(form: FormGroupDirective) {

    if (!this.enrollForm.valid) {
      this.formInvalid = true;
      setTimeout(() => {
        this.formInvalid = false;
      }, 3000);
      return;
    }

    let patient: PatientInfo = {
      name: this.enrollForm.get('firstName')?.value + " " + this.enrollForm.get('lastName')?.value,
      age: this.enrollForm.get('age')?.value!,
      gender: this.enrollForm.get('gender')?.value!,
      medicalCondition: this.enrollForm.get('medicalCondition')?.value!
    };

    this.enrollmentService.enrollPatient(patient).subscribe(this.listener);
    this.enrollForm.reset({firstName: '', lastName: '', age: null, gender: '', medicalCondition: null});
    form.resetForm();
  }

  formValidation() {
    return this.enrollForm.get('firstName')?.pristine || this.enrollForm.get('lastName')?.pristine
      || this.enrollForm.get('age')?.pristine || this.enrollForm.get('gender')?.pristine
      || this.enrollForm.get('medicalCondition')?.pristine || this.enrollForm.pristine;
  }

}
