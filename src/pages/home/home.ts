import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { PostPage } from '../post/post';
import { ProductPage } from '../product/product';

import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  userDetails : any;
  responseData : any;
  dataSet: any;
  userPostData = {"user_id":"","token":""};
  record: boolean;
  loading: any;

  saveItemData = {"user_id": "", "token": "", "product_id": ""};

  constructor(public navCtrl: NavController, public authService:AuthService, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {


    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.saveItemData.user_id = this.userPostData.user_id;
    this.saveItemData.token = this.userPostData.token;

  }

  ionViewDidLoad() {

    this.getFeed();
    //this.getSavedItems();
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

  // getSavedItems(product_id: any) {

  //   this.saveItemData.user_id = this.userPostData.user_id;
  //   this.saveItemData.token = this.userPostData.token;
  //   this.saveItemData.product_id = product_id;

  //   this.authService.postData(this.saveItemData, 'getSavedItems')
  //     .then((result) => {
  //       this.responseData = result;
        
  //       if (this.responseData.getSavedItemsData) {

  //         this.savedItems = this.responseData.getSavedItemsData;

  //         //console.log(this.responseData.getSavedItemsData)

  //         // localStorage.setItem('getSavedItemsData', JSON.stringify(this.responseData));
  //         // const dta = JSON.parse(localStorage.getItem('getSavedItemsData'));
  //         // this.savedItems = dta.getSavedItemsData;

  //         // console.log(this.savedItems.product_id);
        
  //       } else {}
  //     }, (err) => {

  //     });
  // }

  showDetails(item:any){
    alert("PROFILE");
    //this.navCtrl.push(ProductPage, {item: item} );
  }

  post(){
    this.navCtrl.push(PostPage);  
  }

  backToWelcome(){
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  logout(){
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Saving...'
    });
  
    this.loading.present();
  }

  saveItem(product_id: any, name: any){

    this.saveItemData.product_id = product_id;

    this.showLoader();

    if(name == this.userDetails.name){

      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Item',
        subTitle: 'You cant save your post!',
        buttons: ['OK']
      });
      alert.present();

    
    } else {
      this.authService.postData(this.saveItemData,'saveItem').then((result) => {
      this.responseData = result;
      
      //console.log(this.responseData);
      let value = JSON.stringify(this.responseData.error);

      if(value=='"Already saved."'){

        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Item',
          subTitle: 'Already saved!',
          buttons: ['OK']
        });
        alert.present();

      }else{ 
        
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Item',
          subTitle: 'Item saved!',
          buttons: ['OK']
        });
        alert.present();
      
      }
    }, (err) => {
      // Error log
    });
    }
  }
}