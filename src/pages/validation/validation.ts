import { Component } from '@angular/core';
import { NavController,AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-validation',
  templateUrl: 'validation.html'
})
export class ValidationPage {


  userDetails: any;
  val: any;
  responseData : any;
  profileData = {"user_id": "","status": 1};

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,  public authService:AuthService ) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.profileData.user_id = this.userDetails.user_id;
    localStorage.clear();

    console.log(this.userDetails.token);

  }

  validate(){

    if(this.userDetails.token == this.val){

      this.authService.postData(this.profileData,'confirmAccount').then((result) => {
        this.responseData = result;
        if(this.responseData.profileData){
        console.log(this.responseData);
        localStorage.setItem('confirmAccount', JSON.stringify(this.responseData));
        console.log("Success");
        }
        else{ console.log("User already exists"); }
      }, (err) => {
        // Error log
      });

      let alert = this.alertCtrl.create({
        title: 'Confirmation',
        subTitle: 'Account has successfully activated!',
        buttons: ['OK']
      });

      alert.present();

    }else{

      let alert = this.alertCtrl.create({
        title: 'Confirmation',
        subTitle: 'Account is not activated!',
        buttons: ['OK']
      });
      
      alert.present();

    }
  }
  
}
