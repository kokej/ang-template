import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngMatModule } from '../ang-mat/ang-mat.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [CommonModule, AngMatModule, FormsModule, ReactiveFormsModule],
  declarations: [
    LoginComponent,
    LoginUserComponent,
    ForgottenPasswordComponent,
    RegisterComponent
  ],
  exports: [LoginComponent]
})
export class LoginModule {}
