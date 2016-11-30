import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PerformancesService } from '../performances.service';
import { StudentsService } from '../students.service';
import { NamePipe } from '../name.pipe';

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
  savedStudentsList: any;

  constructor (private http: Http,
               private performances: PerformancesService,
               private savedStudents: StudentsService) { }


  getStudents(): Promise<any> {
    return this.http.get(this.studentsUrl)
               .toPromise()
               .then(response => {
                 return response.json();
               })
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  getPerformances() {
    this.performances.getPerformances()
    .then((data) => {
      this.performancesList = data;
    })
  }

  saveStudent(saveName) {
    this.savedStudents.savedStudents(saveName)
    console.log(this.savedStudentsList);
  }

  ngOnInit() {
    this.getStudents()
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
    this.getPerformances();
    this.savedStudentsList = this.savedStudents.sendSavedStudents();
  }
}
