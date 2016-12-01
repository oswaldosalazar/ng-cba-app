import { Component, OnInit } from '@angular/core';
import { FacebookService } from 'ng2-facebook-sdk/dist';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private fb: FacebookService) { }

  fbStatus : boolean = false;

  statusFunction(): void {
    this.fb.getLoginStatus()
    .then((response) => {
      if(response.status === 'connected'){
        this.fbStatus = true;
      } else {
        this.fbStatus = false;
      }
      console.log(this.fbStatus);
    })
  }
  ngOnInit() {
    this.statusFunction()
  }
}
