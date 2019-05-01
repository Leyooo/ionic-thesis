import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ViewProfilePage } from '../../pages/view-profile/view-profile';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ChatPage } from '../../pages/chat/chat';


@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  item:any ;
  userDetails : any;
  responseData : any;
  dataSet: any;
  loading: any;
  userPostData = {"user_id":"","token":""};


  saveItemData = {"user_id": "", "token": "", "product_id": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.item = navParams.get('item');
    
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.saveItemData.user_id = this.userPostData.user_id;
    this.saveItemData.token = this.userPostData.token;

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

  viewProfile(){

    this.navCtrl.push(ViewProfilePage);

  }



  interested(){
    
    alert("Interested");

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

  message(value: any){
    
    if(value == this.userDetails.name){

      let alert = this.alertCtrl.create({
        title: 'Item',
        subTitle: 'You cannot message your own accout!',
        buttons: ['OK']
      });
      alert.present();

        
    }else{

      this.navCtrl.push(ChatPage, { value: value });
    }
  }
}
