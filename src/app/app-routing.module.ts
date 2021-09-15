import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetComponent } from './Components/reset/reset.component';

const routes: Routes = [{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'forgot',component:ForgotComponent},
{path:'reset/:email',component:ResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
