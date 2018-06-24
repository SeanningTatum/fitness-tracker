// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: './training/modules/training.module#TrainingModule',
    canActivate: [AuthGuard]
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

