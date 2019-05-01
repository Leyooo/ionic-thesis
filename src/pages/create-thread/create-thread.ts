import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThreadsPage } from '../threads/threads';
import { AuthService } from '../../providers/auth-service/auth-service';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-create-thread',
  templateUrl: 'create-thread.html'
})
export class CreateThreadPage {

  value: any;
  userDetails : any;
  responseData : any;
  dataSet: any;
  createThreadData = {"user_id": "", "token": "", "cid":"", "title":"" ,"content":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {
    this.value = navParams.get("value");
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    console.log(this.value);
    this.createThreadData.user_id = this.userDetails.user_id;
    this.createThreadData.token = this.userDetails.token;
    this.createThreadData.cid = this.value;
  }
  
  post() {
    this.authService.postData(this.createThreadData, 'createThread')
      .then((result) => {

        this.responseData = result;
        this.navCtrl.pop();

      }, (err) => {

      });
  }

}
