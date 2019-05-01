import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  userDetails : any;
  items: any = ['Male', 'Female'];


  responseData : any;
  imageData = {"user_id": "","token": "", "imageB64": ""};
  profileData = {"user_id": "","name": "", "location": "", "mobile": "", "occupation": ""};


  files : any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService ) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.imageData.user_id = this.userDetails.user_id;
    this.imageData.token = this.userDetails.token;


    this.profileData.user_id = this.userDetails.user_id;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  
  onFileChange(event){
    this.files = event.target.files;
    console.log(event);
  }

  image(){
    this.authService.postData(this.imageData,'profileAvatar').then((result) => {
      this.responseData = result;
      if(this.responseData.imageData){
      console.log(this.responseData);
      localStorage.setItem('imageData', JSON.stringify(this.responseData));
      console.log("Uploaded");
      }
      else{ console.log("User already exists"); }
    }, (err) => {
      // Error log
    });
    }

    updateProfile(){
      this.authService.postData(this.profileData,'updateProfile').then((result) => {
        this.responseData = result;
        if(this.responseData.profileData){
        console.log(this.responseData);
        localStorage.setItem('profileData', JSON.stringify(this.responseData));
        console.log("Success");
        }
        else{ console.log("User already exists"); }
      }, (err) => {
        // Error log
      });
      }

}
