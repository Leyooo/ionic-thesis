import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PostPage } from '../post/post';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { PaymentPage } from '../payment/payment';
import { ChatListPage } from '../chat-list/chat-list';
import { CategoriesPage } from '../categories/categories';

export interface PageInterface{
	title:string;
	pageName:string;
	tabComponent?: any;
	index ?: number;
	icon:string;
}

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
	// Basic root for our content view
  rootPage: any = HomePage;
  userDetails: any;
  record1: boolean;
  record2: boolean;
  total: number;
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  //pages: PageInterface[] = [
  // { title: 'My Profile', pageName: 'ProfilePage', tabComponent: ProfilePage, index: 0, icon: 'person' },
  // { title: 'Browse', pageName: 'HomePage', tabComponent: HomePage, index: 1, icon: 'home' },
  // { title: 'Post Product', pageName: 'PostPage', tabComponent: PostPage, index: 3, icon: 'add-circle' },
  // { title: 'About', pageName: 'AboutPage', tabComponent: AboutPage, index: 4, icon: 'information-circle' },
  //];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.progress();
  }

  ionViewDidLoad() {
  
    this.userDetails.type === '0' ? this.record1 = false : this.record1 = true;
    this.userDetails.type === '0' ? this.record2 = true : this.record2 = false;
    console.log('ionViewDidLoad MenuPage');
  }


  //openPage(page: PageInterface){
//    this.nav.setRoot(page.tabComponent);

  //}

   progress() {
    
     this.total = 0;
    
     if(this.userDetails.name!="") {
      this.total+=10;
     }
     if(this.userDetails.username!="") {
      this.total+=10;
     }
     if(this.userDetails.password!="") {
      this.total+=10;
     }
     if(this.userDetails.email!="") {
      this.total+=10;
     }
     if(this.userDetails.location!="") {
      this.total+=10;
     }
    
     if(this.userDetails.occupation!="") {
      this.total+=10;
     }

     if(this.userDetails.tel!="") {
      this.total+=10;
     }
     
          if(this.userDetails.sex!="") {
           this.total+=10;
          }
          
               if(this.userDetails.avatar!="noimage.png") {
                this.total+=20;
               }

    }


  goHome(){
    this.nav.setRoot(HomePage);
  }
  goCategories(){
    this.nav.setRoot(CategoriesPage);
  }
  goPost(){
    this.nav.setRoot(PostPage);
  }
  goAbout(){
    this.nav.setRoot(AboutPage);
  }
  goProfile(){
    this.nav.setRoot(ProfilePage);
  }
  goMessages(){
    this.nav.setRoot(ChatListPage);
  }

  backToWelcome(){
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  logout(){
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    /*let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }*/
 
    // Fallback needed when there is no active childnav (tabs not active)
    /*if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;*/
  }

  start(){
    this.navCtrl.push(PaymentPage);
  }

}
