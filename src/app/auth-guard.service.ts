import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
@Injectable()
export class AuthGuard implements CanActivate {
    user$;
    user: any;
    constructor(private store: Store<{ user: any }>, public router: Router) {}

    async canActivate(): Promise<boolean> {
        let allowed: boolean;
        this.store.pipe(select('user')).subscribe((data) => {
            if (data && data.email) {
                allowed = true;
            } else {
                this.router.navigate([ '' ]);
                allowed = false;
            }
        });
        return allowed;
    }
}
