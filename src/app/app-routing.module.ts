import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/Login/login.component';
import { NotesdialogComponent } from './Components/notesdialog/notesdialog.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetComponent } from './Components/reset/reset.component';
const routes: Routes = [{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'forgot',component:ForgotComponent},
{path:"reset/:token",component:ResetComponent},
{path:"home",component:HomeComponent},
{path:"temp",component:NotesdialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
