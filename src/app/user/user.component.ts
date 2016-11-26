import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component'
import { FacebookService, FacebookInitParams, FacebookLoginResponse, FacebookAuthResponse } from 'ng2-facebook-sdk/dist';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [FacebookService]
})
export class UserComponent implements OnInit {
  user: any;
  userReady: boolean = false;
  userPicture = 'something';


  constructor( public fb: FacebookService ) {
    this.fb.api("/me?fields=name,gender")
      .then(function(user) {
        console.log("FROM USER COMPONENT", user)
        user.picture = "https://graph.facebook.com/" + user.id + "/picture?type=large";
        this.userPicture = user.picture;
      })
    }

    FBLogout(): void {
      this.fb.getLoginStatus().then(
      (response: FacebookLoginResponse) => {
        if (response.status === 'connected') {
          console.log("button logout",response)
          this.fb.logout()
          .then(function(response) {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
       }
     })
  };


  ngOnInit( ) {

  }
}
