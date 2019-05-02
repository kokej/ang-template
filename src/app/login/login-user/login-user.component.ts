import { Component } from '@angular/core';
import { TabContentComponent } from '../tab-content.component';

@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html'
})
export class LoginUserComponent extends TabContentComponent {
    constructor() {
        super();
        this.type = 'login-user';
    }

    googleLogin() {
        this.loginProvider = 'google';
    }
}
