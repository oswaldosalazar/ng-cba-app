import { Component, OnInit } from '@angular/core';
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
  selectedStudent: string;

  constructor( private performances: PerformancesService,
               private savedStudents: StudentsService ) { }

  getPerformances() {
    this.performances.getPerformances()
    .then((data) => {
      this.performancesList = data;
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
    this.savedStudentsList = this.savedStudents.sendSavedStudents();
    console.log(this.savedStudentsList);
    this.getPerformances();
  }

}
