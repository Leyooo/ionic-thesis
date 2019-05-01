import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiscussionsPage } from '../discussions/discussions';
import { CreateThreadPage } from '../create-thread/create-thread';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ThreadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-threads',
  templateUrl: 'threads.html',
})
export class ThreadsPage {
  
  value: any;
  userDetails : any;
  responseData : any;
  dataSet: any;
  userPostData = {"user_id":"","token":"", "cid":""};
  record: boolean;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {
    this.value = navParams.get('cat');
    this.userPostData.cid=this.value;
    console.log(this.value);
  }

  ionViewDidLoad() {

    this.getFeed();
    //this.getSavedItems();
  }


  getFeed() {
    this.authService.postData(this.userPostData, 'getThreads')
      .then((result) => {
        this.responseData = result;
        if (this.responseData.threadData) {
          this.dataSet = this.responseData.threadData;
        } else {}
      }, (err) => {

      });
  }

  goToDis(){
    this.navCtrl.push(DiscussionsPage);
  } 
  
  createPost(){
    this.navCtrl.push(CreateThreadPage, {
    value: this.value
    });

  }



}
