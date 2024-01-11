import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { DahboardComponent } from './pages/dahboard/dahboard.component';
import { AccessControlComponent } from './pages/access-control/access-control.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { ProjectDataComponent } from './pages/project-data/project-data.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { VerifyExpertComponent } from './pages/Expert/verify-expert/verify-expert.component';
import { FindExpertComponent } from './pages/Expert/find-expert/find-expert.component';
import { ExpertInfoComponent } from './components/expert-info/expert-info.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MasterLayoutComponent,
    DahboardComponent,
    AccessControlComponent,
    UserDataComponent,
    ProjectDataComponent,
    UserInfoComponent,
    ProjectInfoComponent,
    VerifyExpertComponent,
    FindExpertComponent,
    ExpertInfoComponent,
    UserProjectsComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
