import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UsersService } from './../../../services/users/users.service'


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  successMessage: any;
  errormsg: any;
  data: any;
  access_token: any;


  constructor(private spinnerService: Ng4LoadingSpinnerService, private userServcie: UsersService) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
  }

  ngOnInit() { }

  focuesd() {
    this.errormsg = '';
  }

  updatePassword(form) {
    this.errormsg = '';
    let formdata = {
      current_password: form.value.old_pass,
      new_password: form.value.user_pass1
    }
    console.log(formdata)
    this.spinnerService.show();
    this.userServcie.changePassword(formdata, this.access_token)
      .then((res: any) => {
        console.log(res);
        this.successMessage = res.message;
        setTimeout(() => {
          this.successMessage = '';
        }, 4000)
        form.reset();
        this.spinnerService.hide();
        // this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        this.errormsg = error.message;
        setTimeout(() => {
          this.errormsg = '';
        }, 3000)
        console.log(error);
      });
  }
}
