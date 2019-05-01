import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, Events, Content } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  dataSet: any;
  responseData : any;
  userDetails : any;
  messageData = {"user_id": "", "token": "", "to_user_id": "","time": "", "message": "", "status": ""};
  getMsgData = {"user_id": ""};
  user: any;
  
  constructor(navParams: NavParams,
    private events: Events,
    public authService:AuthService) {


      this.user = navParams.get('value');
      this.scrollToBottom();
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
      this.messageData.user_id = this.userDetails.user_id;
      this.messageData.token = this.userDetails.token;
      this.getMsgData.user_id = this.userDetails.user_id;
  
 
  }

  ionViewDidLoad(){

      this.authService.postData(this.getMsgData, 'getMessage')
        .then((result) => {
          this.responseData = result;
          if (this.responseData.getMessageData) {
            this.dataSet = this.responseData.getMessageData;
          } else {}
        }, (err) => {
  
        });

  }

  post(){

    this.messageData.to_user_id = this.user.user_id;
    this.messageData.status = "success";



    this.authService.postData(this.messageData,'sendMessage').then((result) => {
     this.responseData = result;
     if(this.responseData.messageData){
     console.log(this.responseData);
     localStorage.setItem('messageData', JSON.stringify(this.responseData));
     this.ionViewDidLoad();
     this.scrollToBottom();
     //this.navCtrl.setRoot(MenuPage);
     }
     else{ console.log("Error"); }
   }, (err) => {
     // Error log
   });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }


}