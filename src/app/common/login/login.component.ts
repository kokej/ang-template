import { Component, HostListener, ElementRef } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { UserFormType } from './UserFormType';
import { Store, select } from '@ngrx/store';
import { ResetUser } from '../../store/user/user.actions';
import { SendMessage } from '../../store/messaging/messaging.actions';
import { SetLoadingStatus } from '../../store/loading/loading.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user$;
  userFormData: UserFormType;
  isForgotPassword: boolean;
  userDetails: any;
  showLogin: boolean;

  constructor(
    private store: Store<{ user: any }>,
    private authService: AuthenticationService,
    private elementRef: ElementRef
  ) {
    this.isForgotPassword = false;
    this.user$ = store.pipe(select('user')).subscribe(data => {
      this.userDetails = data;
    });
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // clicked outside => close dropdown list
      this.showLogin = false;
    }
  }

  // SignOut Firebase Session and Clean LocalStorage
  logoutUser() {
    this.store.dispatch(new SetLoadingStatus(true));
    this.authService.logout().then(
      res => {
        this.userDetails = undefined;
        this.store.dispatch(new ResetUser());
        this.store.dispatch(new SetLoadingStatus(false));
        this.store.dispatch(
          new SendMessage({ type: 'success', text: 'User succesfully logout' })
        );
      },
      err => {
        this.store.dispatch(new SetLoadingStatus(false));
        this.store.dispatch(
          new SendMessage({ type: 'danger', text: err.message })
        );
      }
    );
  }

  // Send link on given email to reset password
  forgotPassword() {
    this.store.dispatch(new SetLoadingStatus(true));
    this.authService.sendPasswordResetEmail(this.userFormData.user.email).then(
      res => {
        this.isForgotPassword = false;
        this.store.dispatch(new SetLoadingStatus(false));
        this.store.dispatch(
          new SendMessage({ type: 'success', text: 'Please Check Your Email' })
        );
      },
      err => {
        this.store.dispatch(new SetLoadingStatus(false));
        this.store.dispatch(
          new SendMessage({ type: 'danger', text: err.message })
        );
      }
    );
  }

  // Open Popup to Login with Google Account
  googleLogin() {
    this.store.dispatch(new SetLoadingStatus(true));
    this.authService.loginWithGoogle().then(
      res => {
        this.store.dispatch(new SetLoadingStatus(false));
        this.store.dispatch(
          new SendMessage({
            type: 'success',
            text: 'Successfully Logged In with Google'
          })
        );
      },
      err => {
        this.store.dispatch(new SetLoadingStatus(false));
        this.store.dispatch(
          new SendMessage({ type: 'danger', text: err.message })
        );
      }
    );
  }

  // Login user with  provided Email/ Password
  loginUser() {
    this.store.dispatch(new SetLoadingStatus(true));
    this.authService
      .login(this.userFormData.user.email, this.userFormData.user.password)
      .then(
        res => {
          this.store.dispatch(new SetLoadingStatus(false));
          this.store.dispatch(
            new SendMessage({
              type: 'success',
              text: 'Successfully Logged In!'
            })
          );
          // this.showMessage('success', 'Successfully Logged In!');
        },
        err => {
          this.store.dispatch(new SetLoadingStatus(false));
          this.store.dispatch(
            new SendMessage({ type: 'danger', text: err.message })
          );
        }
      );
  }

  // Register user with  provided Email/ Password
  registerUser() {
    this.store.dispatch(new SetLoadingStatus(true));
    this.authService
      .register(this.userFormData.user.email, this.userFormData.user.password)
      .then(
        res => {
          // Send Varification link in email
          this.authService.sendEmailVerification().then(
            () => {
              this.isForgotPassword = false;
              this.store.dispatch(new SetLoadingStatus(false));
              this.store.dispatch(
                new SendMessage({
                  type: 'success',
                  text: 'Registration Successful! Please Verify Your Email'
                })
              );
            },
            err => {
              this.store.dispatch(new SetLoadingStatus(false));
              this.store.dispatch(
                new SendMessage({ type: 'danger', text: err.message })
              );
            }
          );
        },
        err => {
          this.store.dispatch(new SetLoadingStatus(false));
          this.store.dispatch(
            new SendMessage({ type: 'danger', text: err.message })
          );
        }
      );
  }
  handleData(data) {
    this.userFormData = data;
    if (this.userFormData.loginProvider) {
      return this.googleLogin();
    }
    switch (this.userFormData.type) {
      case 'login-user':
        return this.loginUser();
      case 'register-user':
        return this.registerUser();
      case 'forgot-pwd':
        return this.forgotPassword();
      default:
        return;
    }
  }
}
