import { Component } from '@angular/core';
import { TabContentComponent } from '../tab-content.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent extends TabContentComponent {
    constructor() {
        super();
        this.type = 'register-user';
    }
}
