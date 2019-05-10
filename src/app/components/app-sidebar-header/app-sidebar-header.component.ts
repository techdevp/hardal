import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../app.global';
@Component({
  selector: 'app-sidebar-header',
  templateUrl: './app-sidebar-header.component.html'
})
export class AppSidebarHeaderComponent {
  user: any;
  photo_url: any;
  data: any;
  account_type: any;
  constructor(private route: Router) {
    this.user = JSON.parse(window.localStorage.getItem('logindetails'));
    console.log(this.user);
    this.photo_url = GlobalVariable.USER_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.account_type = this.data.user.account_type;
  }
  logout() {
    window.localStorage.removeItem('logindetails');
    window.localStorage.removeItem('token');
    this.route.navigate(['/login']);
    console.log('clear')
  }
}
