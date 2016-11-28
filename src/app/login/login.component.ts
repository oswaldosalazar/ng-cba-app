import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookService, FacebookInitParams, FacebookLoginResponse } from 'ng2-facebook-sdk/dist';
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
  fbStatus: boolean = false;

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
        let userId = response.authResponse.userID;
        console.log('FB userID: ', userId);
        let params = new Array<string>();
        this.fb.api("/me?fields=name,gender")
          .then( (user) => {
            this.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            this.username = user.name;
            this.fbStatus = true;
            console.log(this.username)
            return user
          })
          .catch(function(error){
            console.log(error)
          }),
      (error: any) => console.error(error)
    });
  }

  ngOnInit() {

  }

}
