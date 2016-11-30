import { Component } from '@angular/core';
import {FacebookService, FacebookLoginResponse} from 'ng2-facebook-sdk/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FacebookService]
})
export class AppComponent {
  constructor() { }
}
