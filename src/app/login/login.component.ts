import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookService, FacebookInitParams, FacebookLoginResponse, FacebookLoginStatus } from 'ng2-facebook-sdk/dist';
import { Injectable } from '@angular/core';

@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: '/login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = 'Login with fb';
  picture : string = './assets/images/user.jpg';
  userId: string;
  fbStatus: boolean = true;

  constructor(private fb: FacebookService) {
    let fbParams: FacebookInitParams = {
                                   appId: '1291122410908103',
                                   xfbml: true,
                                   version: 'v2.8'
                                   };
    this.fb.init(fbParams);
  }


  FBLogin(): void {
    let permissions = new Array<string>();

    permissions = ['public_profile'];
    this.fb.login(permissions).then(
      (response: FacebookLoginResponse) => {
        console.log(response);
        this.userId = response.authResponse.userID;
        console.log('FB userID: ', this.userId);
        let params = new Array<string>();
        this.fb.api("/me?fields=name,gender")
          .then( (user) => {
            this.picture = "https://graph.facebook.com/" + this.userId + "/picture?type=large";
            this.username = user.name;
            this.fbStatus = true;
            return user
          })
          .catch(function(error){
            console.log(error)
          }),
      (error: any) => console.error(error)
    });
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
    console.log('From init', this.userId, this.fbStatus)
    if(!this.fbStatus){
      this.picture = './assets/images/user.jpg';
      this.username = 'Login with fb';
    } else {
      this.picture = "https://graph.facebook.com/" + this.userId + "/picture?type=large";
      this.username = this.username;
    }
  }

}
