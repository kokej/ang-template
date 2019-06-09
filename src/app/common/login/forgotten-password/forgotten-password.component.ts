import { Component } from '@angular/core';
import { TabContentComponent } from '../tab-content.component';

@Component({
    selector: 'app-forgotten-password',
    templateUrl: './forgotten-password.component.html'
})
export class ForgottenPasswordComponent extends TabContentComponent {
    constructor() {
        super();
        this.type = 'forgot-pwd';
    }
}
