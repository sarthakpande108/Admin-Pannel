import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { DahboardComponent } from './pages/dahboard/dahboard.component';
import { AccessControlComponent } from './pages/access-control/access-control.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { ProjectDataComponent } from './pages/project-data/project-data.component';
import { FindExpertComponent } from './pages/Expert/find-expert/find-expert.component';
import { VerifyExpertComponent } from './pages/Expert/verify-expert/verify-expert.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ExpertInfoComponent } from './components/expert-info/expert-info.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import  { LoginComponent } from "./pages/login/login.component"
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:MasterLayoutComponent ,canActivate:[AuthGuard],
  children:[
    {path:'',component:DahboardComponent},
    {path:'access-control',component:AccessControlComponent},
    {path: 'user-data', component: UserDataComponent},
    {path:'user-info',component:UserInfoComponent},
    {path: 'project-data', component: ProjectDataComponent },
    {path:'project-info',component:ProjectInfoComponent},
    {path:'find-expert',component:FindExpertComponent},
    {path:'verify-expert',component:VerifyExpertComponent},
    {path:'expert-info',component:ExpertInfoComponent},
    {path:'user-project',component:UserProjectsComponent},
  ]
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
