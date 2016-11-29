import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PerformancesService } from '../performances.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [PerformancesService]
})
export class StudentsComponent implements OnInit {
  private studentsUrl = 'https://immense-basin-54112.herokuapp.com/api/students';
  students = [];
  allNames = [];
  selectedStudent = '';
  performancesList = [];

  constructor (private http: Http,
               private performances: PerformancesService) {}


  getStudents(): Promise<any> {
    return this.http.get(this.studentsUrl)
               .toPromise()
               .then(response => {
                 return response.json();
               })
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  selectStudent(student) {
    console.log(student)
    this.selectedStudent = student;
  }

  getPerformances() {
    this.performances.getPerformances()
    .then((data) => {
      console.log(data)
      this.performancesList = data;
    })
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
    })
    this.getPerformances();
  }

}
