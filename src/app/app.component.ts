import { Component } from '@angular/core';
import {FacebookService, FacebookLoginResponse} from 'ng2-facebook-sdk/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FacebookService]
})
export class AppComponent {
  title1 = 'Colorado Ballet Academy';
  title2 = 'The Nutcracker'
  subtitle = 'Parent Information Packet'

  constructor() { }

}
