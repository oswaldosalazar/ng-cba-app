import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';

export const routes: Routes = [
  { path: '',   component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'user',   component: UserComponent },
  { path: 'students',   component: StudentsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
