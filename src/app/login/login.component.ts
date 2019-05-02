import { Component, HostListener, ElementRef } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { UserFormType } from './UserFormType';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {
    responseMessage = '';
    responseMessageType = '';
    userFormData: UserFormType;
    isForgotPassword: boolean;
    userDetails: any;
    showLogin: boolean;

    constructor(private authService: AuthenticationService, private elementRef: ElementRef) {
        this.isForgotPassword = false;
    }
    @HostListener('document:mousedown', [ '$event' ])
    onGlobalClick(event): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            // clicked outside => close dropdown list
            this.showLogin = false;
        }
    }

    // Comman Method to Show Message and Hide after 2 seconds
    showMessage(type, msg) {
        this.responseMessageType = type;
        this.responseMessage = msg;
        setTimeout(() => {
            this.responseMessage = '';
        }, 2000);
    }

    // Check localStorage is having User Data
    isUserLoggedIn() {
        this.userDetails = this.authService.isUserLoggedIn();
        console.log(this.userDetails);
    }

    // SignOut Firebase Session and Clean LocalStorage
    logoutUser() {
        this.authService.logout().then(
            (res) => {
                this.userDetails = undefined;
                localStorage.removeItem('user');
            },
            (err) => {
                this.showMessage('danger', err.message);
            }
        );
    }

    // Send link on given email to reset password
    forgotPassword() {
        this.authService.sendPasswordResetEmail(this.userFormData.user.email).then(
            (res) => {
                this.isForgotPassword = false;
                this.showMessage('success', 'Please Check Your Email');
            },
            (err) => {
                this.showMessage('danger', err.message);
            }
        );
    }

    // Open Popup to Login with Google Account
    googleLogin() {
        this.authService.loginWithGoogle().then(
            (res) => {
                this.showMessage('success', 'Successfully Logged In with Google');
                this.isUserLoggedIn();
            },
            (err) => {
                this.showMessage('danger', err.message);
            }
        );
    }

    // Login user with  provided Email/ Password
    loginUser() {
        this.responseMessage = '';
        this.authService.login(this.userFormData.user.email, this.userFormData.user.password).then(
            (res) => {
                this.showMessage('success', 'Successfully Logged In!');
                this.isUserLoggedIn();
            },
            (err) => {
                this.showMessage('danger', err.message);
            }
        );
    }

    // Register user with  provided Email/ Password
    registerUser() {
        this.authService.register(this.userFormData.user.email, this.userFormData.user.password).then(
            (res) => {
                // Send Varification link in email
                this.authService.sendEmailVerification().then(
                    (res) => {
                        this.isForgotPassword = false;
                        this.showMessage('success', 'Registration Successful! Please Verify Your Email');
                    },
                    (err) => {
                        this.showMessage('danger', err.message);
                    }
                );
                this.isUserLoggedIn();
            },
            (err) => {
                this.showMessage('danger', err.message);
            }
        );
    }
    handleData(data) {
        this.showMessage('', '');
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
