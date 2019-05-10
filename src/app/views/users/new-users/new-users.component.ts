import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss']
})
export class NewUsersComponent implements OnInit {
  users: any;
  user_image_url: any;
  constructor(private _user: UsersService) {
    this.user_image_url = GlobalVariable.USER_IMAGE_URL;
    this.getUsers();
  }

  ngOnInit() {
  }
  getUsers() {
    this._user.getAllUsers(10)
      .then((data: any) => {
        this.users = data;
        console.log(this.users);
        this.users.forEach((item: any) => {

        })
      })
      .catch((error: any) => {

      });
  }
}
