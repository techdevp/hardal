import { NgModule } from '@angular/core';;
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { LoginComponent } from './login.component';
import { LoginModuleRoutingModule } from './login-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthService } from '../../services/auth/auth.service'
import { HttpModule } from '@angular/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, } from "angular5-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("843807447884-5sqlj79rmj2k5l8t20un55p5kgb8ii5v.apps.googleusercontent.com")
      },
    ]
  );
  return config;
}

@NgModule({
  imports: [
    LoginModuleRoutingModule,
    FormsModule,
    HttpModule,
    SocialLoginModule,
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  declarations: [LoginComponent, ForgotPasswordComponent],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, AuthService, Ng4LoadingSpinnerService]
})
export class LoginModule { }
