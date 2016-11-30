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

  ngOnInit() {
    this.savedStudentsList = this.savedStudents.sendSavedStudents();
    console.log(this.savedStudentsList);
    this.getPerformances();
  }

}
