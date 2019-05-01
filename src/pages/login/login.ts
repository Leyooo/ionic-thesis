import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthService }  from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';
import { MenuPage } from '../menu/menu';
import { ValidationPage } from '../validation/validation';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  loading: any;
  userData = {"username": "","password": ""};
  userDetails: any;

  constructor(public navCtrl: NavController,
    public authService:AuthService,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Submitting...'
    });
  
    this.loading.present();
  }

  login(){
    this.showLoader();
    if(this.userData.username && this.userData.password){      
      this.authService.postData(this.userData,'login').then((result) => {
        
        this.responseData = result;
        //console.log(this.responseData);
        let value = JSON.stringify(this.responseData.error);

        if(value=='"Bad request wrong username and password"'){
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Login',
            subTitle: 'Oh no! Invalid credentials.',
            buttons: ['OK']
          });
          alert.present();
          
       
        } else {

          this.loading.dismiss();
          //let alert = this.alertCtrl.create({
            //title: 'Login',
           // subTitle: 'Welcome back Kapwa KaSiseedlan!',
            //buttons: [
              //{
                //text: 'OK',
                //handler: () => {

                  localStorage.setItem('userData', JSON.stringify(this.responseData));
                  const data = JSON.parse(localStorage.getItem('userData'));
                  this.userDetails = data.userData;
                  //localStorage.clear();
                  console.log(this.userDetails);
                  console.log(this.userDetails.status);
                    this.navCtrl.push(MenuPage);
                //}
             // }
            //]
          //});
          //alert.present();

        }

      }, (err) => {
        // Error log
      });

    }else{
      
      if(this.userData.username == "" && this.userData.password == ""){

        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Login',
          subTitle: 'Empty username and password!',
          buttons: ['OK']
        });
        alert.present();

      }else if (this.userData.username){

        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Login',
          subTitle: 'Empty username!',
          buttons: ['OK']
        });
        alert.present();

      }else{

        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Login',
          subTitle: 'Empty password!',
          buttons: ['OK']
        });
        alert.present();

      }
    }
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }
}
