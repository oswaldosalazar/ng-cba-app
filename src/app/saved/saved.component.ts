import { Component, OnInit } from '@angular/core';
import { FacebookService } from 'ng2-facebook-sdk/dist';
import { PerformancesService } from '../performances.service';
import { StudentsService } from '../students.service';
import { NamePipe } from '../name.pipe';
import { DatePipe } from '../date.pipe';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css'],
  providers: [PerformancesService, StudentsService]
})
export class SavedComponent implements OnInit {

  performancesList = [];
  savedStudentsList: any;
  selectedStudent: string;
  fbStatus: boolean;
  fbUserId: string;
  savedTest: any;

  today = new Date(Date.now() - 25200000);
  todayFormatted: string = this.today.toISOString();

  constructor( private performances: PerformancesService,
               public savedStudents: StudentsService,
               private fb: FacebookService ) { }

  checkLoginStatusAndId() {
    this.fb.getLoginStatus()
    .then((response) => {
      if(response.status === 'connected'){
        this.fbStatus = true;
        this.fbUserId = response.authResponse.userID;
        this.getSaved();
      } else {
        this.fbStatus = false;
      }
    })
  }

  getPerformances() {
    this.performances.getPerformances()
    .then((data) => {
      this.performancesList = data;
    })
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

  clickedStudent(student) {
    this.selectedStudent = student;
  }

  deleteStudent(student) {
    let index = this.savedStudentsList.indexOf(student, 0);
    if (index > -1) {
      this.savedStudentsList.splice(index, 1);
    }
    console.log(this.savedStudentsList)
    if(this.savedStudentsList.length === 0) {
      // this.selectedStudent = null;
      this.savedStudents.deleteSavedStudents()
      .subscribe(
         data => {
           // refresh the list
           this.savedStudents.getSavedStudents(this.fbUserId);
           return true;
         },
         err => {
           console.log(err);
         }
      )
    }

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

  ngOnInit() {
    this.checkLoginStatusAndId();
    this.fb.getLoginStatus()
    .then((response) => {
      if(response.status === 'connected'){
        this.fbStatus = true;
        this.fbUserId = response.authResponse.userID;
      } else {
        this.fbStatus = false;
      }
    })
    if(this.fbStatus){
      this.getSaved();
    }
    this.getPerformances();

  }

}
