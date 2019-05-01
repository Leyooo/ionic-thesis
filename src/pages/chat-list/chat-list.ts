import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ChatPage } from '../../pages/chat/chat';

@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  dataSet: any;
  responseData : any;
  userDetails : any;
  messageData = {"user_id": "", "token": "", "to_user_id": "","time": "", "message": "", "status": ""};
  getMsgData = {"user_id": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public authService:AuthService) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.messageData.user_id = this.userDetails.user_id;
    this.messageData.token = this.userDetails.token;
    this.getMsgData.user_id = this.userDetails.user_id;
  }

  ionViewDidLoad() {
    
          this.authService.postData(this.getMsgData, 'getMessageList')
            .then((result) => {
              this.responseData = result;
              if (this.responseData.getMessageData) {
                this.dataSet = this.responseData.getMessageData;
              } else {}
            }, (err) => {
      
            });
  }

  message(value: any){

    this.navCtrl.push(ChatPage, { value: value });
    
  }

}
