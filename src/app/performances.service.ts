import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PerformancesService {

  private performancesUrl = 'https://immense-basin-54112.herokuapp.com/api/performancesStudents';
  performances = [];

  constructor(private http: Http) { }

  getPerformances(): Promise<any> {
    return this.http.get(this.performancesUrl)
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

}
