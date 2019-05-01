import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ValidationPage } from '../validation/validation';
import { AuthService } from '../../providers/auth-service/auth-service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../../validators/username.validator';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  loading: any;
  items: any[];
  checked: any[] = [];

  responseData : any;
  userData = {"username": "","password": "", "name": "","email": "", "pref": ""};

  constructor(public navCtrl: NavController, public authService:AuthService, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController ) {

    this.items = [
      { val: 'DOTA'},
      { val: 'League of Legends'},
      { val: 'Mobile Legends'},
      { val: 'Arena of Valor'}
    ];
  }

  // addCheckbox(event, checkbox: string){

  //   if ( event.checked ) {
  //     this.checked.push(checkbox);
  //   }else{
  //     let index = this.removeCheckedFromArray(checkbox);
  //     this.checked.splice(index,1);
  //   }
  // }

  //   removeCheckedFromArray(checkbox : String) {
  //     return this.checked.findIndex((category)=>{
  //       return category === checkbox;
  //     })
  //   }
  
  //   emptyCheckedArray() {
  //     this.checked = [];
  //   }
  
  //  getCheckedBoxes() {
  //    console.log(this.checked);
  //  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Submitting...'
    });
  
    this.loading.present();
  }

  signup(){
    this.authService.postData(this.userData,'signup').then((result) => {
     this.responseData = result;

     if(this.responseData.userData){

      localStorage.setItem('userData', JSON.stringify(this.responseData));

      this.showLoader();
      let alert = this.alertCtrl.create({

        title: 'Registration',
        subTitle: 'Registered successfully!',
        buttons: ['OK']

      });

      alert.present();
      this.loading.dismiss();
      this.navCtrl.push(LoginPage);

     }else{ 

      this.showLoader();
      let alert = this.alertCtrl.create({

        title: 'Registration',
        subTitle: 'User already exists!',
        buttons: ['OK']

      });

      alert.present();
      this.loading.dismiss();
      this.navCtrl.push(SignupPage);
      
    }
   }, (err) => {
     // Error log
   });
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  ionViewWillLoad() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group
    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain both numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Fullname is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
  };
}