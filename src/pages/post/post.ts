import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { MenuPage } from '../menu/menu';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  responseData : any;
  userDetails : any;
  productData = {"user_id": "", "token": "", "product_name": "", "tips": "", "category": "", "description": "", "price": "", "image": ""};
  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController, public authService:AuthService, public navParams: NavParams, 
    //private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.productData.user_id = this.userDetails.user_id;
    this.productData.token = this.userDetails.token;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  post(){
    this.authService.postData(this.productData,'postProduct').then((result) => {
     this.responseData = result;
     if(this.responseData.productData){
     console.log(this.responseData);
     localStorage.setItem('productData', JSON.stringify(this.responseData));
     this.navCtrl.setRoot(MenuPage);
     }
     else{ console.log("Error"); }
   }, (err) => {
     // Error log
   });
  }

}
