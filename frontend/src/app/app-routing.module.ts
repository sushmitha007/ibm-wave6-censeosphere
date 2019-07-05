import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ReviwerdashComponent } from './reviwerdash/reviwerdash.component';
const routes: Routes = [  
  { path: 'login', component:UserLoginComponent },
  { path: 'account', component: NewaccountComponent},
  {path:'rprofile',component:UpdateprofileComponent},
  {path:'reviwerdashboard',component:ReviwerdashComponent},
  {path:'returnlanding',component:LandingPageComponent},
  { path: '**',component:LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }