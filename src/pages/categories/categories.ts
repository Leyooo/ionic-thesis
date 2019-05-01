import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ThreadsPage } from "../threads/threads";

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  CategoryTapped(cat: any){

    this.navCtrl.push(ThreadsPage, {cat: cat});

  }
}
