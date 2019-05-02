import { EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserFormType, UserFormTypes } from './UserFormType';

export abstract class TabContentComponent implements OnInit, OnDestroy {
    protected loginProvider = null;
    protected type: UserFormTypes;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onComplete: EventEmitter<UserFormType> = new EventEmitter();

    userForm = new FormGroup({
        email: new FormControl('jamarqueza@gmail.com'),
        password: new FormControl('')
    });

    protected init() {}

    userFormHandler() {
        this.onComplete.emit({ type: this.type, user: this.userForm.value, loginProvider: this.loginProvider });
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {}
}
