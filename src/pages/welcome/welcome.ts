import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) {

    if(localStorage.getItem('userData')){

      this.navCtrl.setRoot(HomePage);

    }

  }



  goToLogin(){
    
        this.navCtrl.setRoot(LoginPage);
    
      }

  
}
