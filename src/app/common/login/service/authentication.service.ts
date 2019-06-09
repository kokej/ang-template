import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SetUser, ResetUser } from '../../../store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authState: Subscription = new Subscription();
  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private store: Store<{ count: number }>
  ) {
    this.authState = this.angularFireAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        this.store.dispatch(
          new SetUser({
            displayName: userResponse.displayName,
            email: userResponse.email
          })
        );
      } else {
        this.store.dispatch(new ResetUser());
      }
    });
  }

  async login(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  async register(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(
      passwordResetEmail
    );
  }

  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }

  async loginWithGoogle() {
    return await this.angularFireAuth.auth.signInWithPopup(
      new auth.GoogleAuthProvider()
    );
  }
}
