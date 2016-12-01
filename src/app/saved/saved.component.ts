import { Component, OnInit } from '@angular/core';
import { FacebookService } from 'ng2-facebook-sdk/dist';
import { PerformancesService } from '../performances.service';
import { StudentsService } from '../students.service';
import { NamePipe } from '../name.pipe';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css'],
  providers: [PerformancesService, StudentsService]
})
export class SavedComponent implements OnInit {

  performancesList = [];
  savedStudentsList: any;
  savedStudentsListTest = [];
  selectedStudent: string;
  fbStatus: boolean;
  fbUserId: string;

  constructor( private performances: PerformancesService,
               private savedStudents: StudentsService,
               private fb: FacebookService ) { }

  getPerformances() {
    this.performances.getPerformances()
    .then((data) => {
      this.performancesList = data;
    })
  }

  getSaved() {
    this.savedStudents.getSaved()
    .then((data) => {
      this.savedStudentsListTest = data;
      console.log(this.savedStudentsListTest)
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
      this.selectedStudent = null;
    }
  }

  ngOnInit() {

    this.fb.getLoginStatus()
    .then((response) => {
      if(response.status === 'connected'){
        this.fbStatus = true;
      } else {
        this.fbStatus = false;
      }
      this.fbUserId = response.authResponse.userID;
      console.log(this.fbUserId);
      console.log("From get Login status", this.fbStatus);
    })

    this.getSaved();
    this.savedStudentsList = this.savedStudents.sendSavedStudents();
    console.log(this.savedStudentsList);
    this.getPerformances();
  }

}
