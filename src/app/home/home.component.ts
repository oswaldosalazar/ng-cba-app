import { Component, OnInit } from '@angular/core';
import { FacebookService, FacebookLoginStatus } from 'ng2-facebook-sdk/dist';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private fb: FacebookService) { }

  fbStatus : boolean = false;

  statusFunction(): void {
    // console.log(this.status)
    this.fb.getLoginStatus()
    .then((response) => {
      if(response.status === 'unknown'){
        this.fbStatus = false;
      } else {
        this.fbStatus = true;
      }
      console.log(this.fbStatus);
    })
  }
  ngOnInit() {
    this.statusFunction()
  }
}
