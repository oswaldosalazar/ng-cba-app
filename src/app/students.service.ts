import { Injectable } from '@angular/core';

const savedStudentsArray = [];

@Injectable()
export class StudentsService {


  constructor() { }

  savedStudents(student) {
    savedStudentsArray.push(student);
    console.log(savedStudentsArray);
  }

  sendSavedStudents(){
    return savedStudentsArray;
  }

}
