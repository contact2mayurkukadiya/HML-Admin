import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],

})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }
  currenturl: any;
  user: any;
  rtoken: any;
  mresto: any;
  setting: any;
  allwallpaper:any;
  subcategory:any;
  ngOnInit() {
    this.user = null;
    this.rtoken = null;
    this.mresto = null;
    this.setting = null;
    this.allwallpaper = null;
    this.subcategory = null;

    this.currenturl = this.router.url;
    if (this.currenturl == '/userlist')
    {
      this.user = 'activelink';
      this.rtoken = 'demo';
      this.mresto = 'demo';
      this.setting = 'demo';
      this.allwallpaper = 'demo';
      this.subcategory = 'demo';
    }
    if (this.currenturl == '/resturanttoken')
    {
      this.user = 'demo';
      this.rtoken = 'activelink';
      this.mresto = 'demo';
      this.setting = 'demo';
      this.allwallpaper = 'demo';
      this.subcategory = 'demo';
    }
    if (this.currenturl == '/allwallpaper')
    {
      this.user = 'demo';
      this.rtoken = 'demo';
      this.mresto = 'demo';
      this.setting = 'demo';
      this.subcategory = 'demo';
      this.allwallpaper = 'activelink';
    }
    if (this.currenturl == '/subcategory')
    {
      this.user = 'demo';
      this.rtoken = 'demo';
      this.mresto = 'demo';
      this.setting = 'demo';
      this.allwallpaper = 'demo';
      this.subcategory = 'activelink';
    }
  }
  list(page) {
    this.router.navigate([page]);
  }
}
