import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '',   component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'user',   component: UserComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
