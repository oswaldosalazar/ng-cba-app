import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// let savedStudentsArray = [];
let user = '';

@Injectable()

export class StudentsService {

  private savedUrl = 'https://immense-basin-54112.herokuapp.com/api/saved';
  containsData: boolean;
  userTableId: any;

  constructor(private http: Http) { }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    };
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  getSavedStudents(userId: string): Observable<any> {
    return this.http.get(`${this.savedUrl}?user_id=${userId}`, { headers: this.setHeaders()})
    .catch(this.formatErrors)
    .map((res:Response) => {
      let data = res.json();
      if(data[0].user_id.length > 0) {
        console.log("Data from getSavedStudents() students.service", data)
        this.containsData = true;
      } else {
        this.containsData = false;
      }
      console.log("contains data ", this.containsData);
      this.userTableId = data[0].id;
      user = this.userTableId;
      console.log("this.userTableId", user)
      return res.json();
    });
  }

  postSavedStudents(id: string, list: Array<string>): Observable<any> {
    let body = { user_id: id, saved_list: list}
    console.log("body from post:", body)
    return this.http.post(`${this.savedUrl}`,
    JSON.stringify(body),
    { headers: this.setHeaders() })
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  updateSavedStudents(list: Array<string>): Observable<any> {
    let body = { id: user, saved_list: list }
    console.log("body from update: ", body)
    return this.http.put(`${this.savedUrl}`,
    JSON.stringify(body),
    { headers: this.setHeaders() })
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  deleteSavedStudents(): Observable<any> {
    let body = { id: this.userTableId }
    console.log("body from delete: ", body)
    return this.http.delete(`${this.savedUrl}?id=${body.id}`,
    { headers: this.setHeaders() })
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

}
