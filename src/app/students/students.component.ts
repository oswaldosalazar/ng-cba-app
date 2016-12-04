import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FacebookService } from 'ng2-facebook-sdk/dist';
import { PerformancesService } from '../performances.service';
import { StudentsService } from '../students.service';
import { NamePipe } from '../name.pipe';
import { DatePipe } from '../date.pipe';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [PerformancesService, StudentsService]
})
export class StudentsComponent implements OnInit {

  private studentsUrl = 'https://immense-basin-54112.herokuapp.com/api/students';
  students = [];
  allNames = [];
  selectedStudent: string = '';
  performancesList = [];
  savedStudentsList: any = [];
  fbStatus: boolean;
  fbUserId: string;

  today = new Date(Date.now() - 25200000);
  todayFormatted: string = this.today.toISOString();

  constructor (private http: Http,
               private performances: PerformancesService,
               private savedStudents: StudentsService,
               private fb: FacebookService) { }

  checkLoginStatusAndId() {
    this.fb.getLoginStatus()
    .then((response) => {
      if(response.status === 'connected'){
        this.fbStatus = true;
        this.fbUserId = response.authResponse.userID;
      } else {
        this.fbStatus = false;
      }
    })
  }

  getStudents(): Promise<any> {
    return this.http.get(this.studentsUrl)
               .toPromise()
               .then(response => {
                 return response.json();
               })
               .then((data) => {
                 this.students = data;
                 this.allNames = this.students.map((elem) => {
                   return elem.name;
                 })
                 this.allNames = this.allNames.filter ( (elem, pos) => {
                   return this.allNames.indexOf(elem) === pos
                 })
                 this.allNames = this.allNames.sort();
               })
               .catch(this.handleError);
  }

  getSaved() {
    this.savedStudents.getSavedStudents(this.fbUserId)
    .subscribe(data => {
      console.log("Data from getSaved() saved.component", data)
      this.savedStudentsList = data[0].saved_list;
      },
      err => {
        console.log(err);
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  saveStudent(name) {
    console.log("contains data from saveStudent students.component", this.savedStudents.containsData)
    if(!this.savedStudents.containsData || this.savedStudents.containsData === undefined){
      this.savedStudentsList.push(name);
      this.savedStudents.postSavedStudents(this.fbUserId, this.savedStudentsList)
      .subscribe(
        data => {
          this.savedStudents.getSavedStudents(this.fbUserId);
          return true;
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      console.log("in else", this.savedStudentsList)
      this.savedStudentsList.push(name);
      console.log("after push", this.savedStudentsList)
      this.savedStudents.updateSavedStudents(this.savedStudentsList)
      .subscribe(
         data => {
           // refresh the list
           this.savedStudents.getSavedStudents(this.fbUserId);
           return true;
         },
         err => {
           console.log(err);
         }
      );
    }
  }

  getPerformances() {
    this.performances.getPerformances()
    .then((data) => {
      this.performancesList = data;
    })
  }


  ngOnInit() {
    this.checkLoginStatusAndId();
    this.savedStudents.getSavedStudents(this.fbUserId);
    this.fb.getLoginStatus()
    .then((response) => {
      if(response.status === 'connected'){
        this.fbStatus = true;
        this.fbUserId = response.authResponse.userID;
        console.log(this.fbUserId);
        this.getSaved();
      } else {
        this.fbStatus = false;
      }
      console.log("From get Login status", this.fbStatus);
    })

    this.getStudents();

    this.getPerformances();

    this.savedStudents.getSavedStudents(this.fbUserId);
  }
}
