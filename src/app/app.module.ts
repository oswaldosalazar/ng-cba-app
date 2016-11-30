import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { AllShowsComponent } from './all-shows/all-shows.component';
import { StudentsComponent } from './students/students.component';
import { NamePipe } from './name.pipe';
import { Typeahead } from '../assets/ng2-typeahead/src/ng2-typeahead';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    AllShowsComponent,
    StudentsComponent,
    NamePipe,
    Typeahead
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
