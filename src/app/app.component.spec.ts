import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NavigationComponent} from "./navigation/navigation.component";
import {RecruitmentComponent} from "./recruitment/recruitment.component";
import {StaffDashboardComponent} from "./staff-dashboard/staff-dashboard.component";

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent, NavigationComponent, RecruitmentComponent, StaffDashboardComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ClinicalRecruitment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ClinicalRecruitment');
  });
});
