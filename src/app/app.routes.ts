import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { SavedComponent } from './saved/saved.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '',   component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'students',   component: StudentsComponent },
  { path: 'saved',   component: SavedComponent },
  { path: 'user',   component: UserComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
