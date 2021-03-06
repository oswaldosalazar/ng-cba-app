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
import { SavedComponent } from './saved/saved.component';
import { DatePipe } from './date.pipe';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    AllShowsComponent,
    StudentsComponent,
    NamePipe,
    SavedComponent,
    DatePipe,
    AboutComponent,
    ContactComponent
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
