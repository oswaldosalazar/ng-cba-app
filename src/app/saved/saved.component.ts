import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css'],
  providers: [StudentsService]
})
export class SavedComponent implements OnInit {

  savedStudentsList: any;
  constructor( private savedStudents: StudentsService ) { }

  ngOnInit() {
    this.savedStudentsList = this.savedStudents.sendSavedStudents();
    console.log(this.savedStudentsList);
  }

}
