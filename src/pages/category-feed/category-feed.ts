import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-category-feed',
  templateUrl: 'category-feed.html',
})
export class CategoryFeedPage {

  category: any;  
  userDetails : any;
  responseData : any;
  dataSet: any;
  userPostData = {"user_id":"","token":""};
  record: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService, ) {

    this.category = navParams.get('cat');

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

  }

  ionViewDidLoad() {
    this.getFeed();


  }


  getFeed() {
    this.authService.postData(this.userPostData, 'getProducts')
      .then((result) => {
        this.responseData = result;
        if (this.responseData.productData) {
          this.dataSet = this.responseData.productData;
        } else {}
      }, (err) => {

      });
  }


}
