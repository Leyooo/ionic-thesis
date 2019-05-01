import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ViewProfilePage } from '../../pages/view-profile/view-profile';
import { AuthService } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userDetails : any;
  account: string = "profile";
  responseData : any;
  dataSet: any;
  savedItems: any;
  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {
  
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

  }

  ionViewDidLoad() {
  
  
  }

  editProfile(){

    this.navCtrl.push(EditProfilePage);
    
  }

  viewProfile(){
    alert("GAMES!");
  }

}
