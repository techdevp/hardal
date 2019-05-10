import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth/auth.service'
import { Router, RouterStateSnapshot } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  errormsg: any;
  successMessage: any;
  submit: boolean = false;

  constructor(public auth: AuthService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() { }
  focuesd() {
    this.errormsg = '';
  }
  submitForm(data, form) {
    this.errormsg = '';
    console.log(data)
    console.log(form.form.status)
    if (!data.email) {
      this.errormsg = "*Please enter email "
      return false;
    }
    if (form.form.status == "INVALID") {
      this.errormsg = "*Please enter a valid email e.g abc@gmail.com"
      return false;
    }
    this.submit = true;
    this.spinnerService.show();
    this.auth.forgotPassword(data)
      .then((res: any) => {
        this.submit = false;
        this.successMessage = res.message;
        setTimeout(() => {
          this.successMessage = '';
        }, 4000)
        this.spinnerService.hide();
        // this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        this.submit = false;
        this.errormsg = error.message;
        setTimeout(() => {
          this.errormsg = '';
        }, 3000)
        console.log(error);
      });
  }
}
