import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from '../providers/auth-service/auth-service';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { CreateThreadPage } from '../pages/create-thread/create-thread';
import { PostPage } from '../pages/post/post';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPipe } from '../pipes/search/search';
import { MenuPage } from '../pages/menu/menu';
import { ProfilePage } from '../pages/profile/profile';
import { ProductPage } from '../pages/product/product';
import { AboutPage } from '../pages/about/about';
import { ValidationPage } from '../pages/validation/validation';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { PaymentPage } from '../pages/payment/payment';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { CategoriesPage } from '../pages/categories/categories';
import { Unlocker } from '../components/unlocker/unlocker';
import { ChatPage } from '../pages/chat/chat';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { CategoryFeedPage } from '../pages/category-feed/category-feed';
import { ChatService } from '../providers/chat-service/chat-service';
import { EmojiProvider } from '../providers/emoji/emoji';

//import { EmojiPickerComponent } from '../components/emoji-picker/emoji-picker';
//import { RelativeTimePipe } from '../pipes/relative-time/relative-time';


import { DiscussionsPage } from '../pages/discussions/discussions';
import { ThreadsPage } from '../pages/threads/threads';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    PostPage,
    MenuPage,
    ProfilePage,
    SearchPipe,
    AboutPage,
    ProductPage,
    ValidationPage,
    EditProfilePage,
    ViewProfilePage,
    PaymentPage,
    CategoriesPage,
    ChatPage,
    Unlocker,
    CategoryFeedPage, 
    ChatListPage,  
    DiscussionsPage, 
    ThreadsPage,
    CreateThreadPage
  ],
  imports: [
    BrowserModule, HttpModule, IonicModule.forRoot(MyApp), HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    PostPage, MenuPage,
    ProfilePage,
    AboutPage,
    ProductPage,
    ValidationPage,
    EditProfilePage,
    ViewProfilePage,
    PaymentPage,
    CategoriesPage,
    ChatPage,
    CategoryFeedPage, 
    ChatListPage, 
    DiscussionsPage, 
    ThreadsPage,
    CreateThreadPage
  ],
  providers: [
    StatusBar,
    SplashScreen, AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    //FileUploadOptions,
    //FileTransferObject,
    File,
    Camera, DatePicker,
    ChatService,
    EmojiProvider,
  ]
})
export class AppModule {}