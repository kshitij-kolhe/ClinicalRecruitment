import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecruitmentComponent} from "./recruitment/recruitment.component";
import {StaffDashboardComponent} from "./staff-dashboard/staff-dashboard.component";

const routes: Routes = [
  {path: "", component: RecruitmentComponent},
  {path: "recruit", component: RecruitmentComponent},
  {path: "staff", component: StaffDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
