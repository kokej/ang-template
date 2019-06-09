import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngMatModule } from './common/ang-mat/ang-mat.module';
import { LoginModule } from './common/login/login.module';
import { HomeComponent } from './public/home/home.component';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { messagingReducer } from './store/messaging/messaging.reducer';
import { loadingReducer } from './store/loading/loading.reducer';
import { BreadcrumbModule } from './common/breadcrumb/breadcrumb.module';

const firebase = {
  apiKey: 'AIzaSyB7UK6myQ46umsRa0WdQHBR0RqRyjxVEwo',
  authDomain: 'user-manager-5aa3d.firebaseapp.com',
  databaseURL: 'https://user-manager-5aa3d.firebaseio.com',
  projectId: 'user-manager-5aa3d',
  storageBucket: 'user-manager-5aa3d.appspot.com',
  messagingSenderId: '413823349307'
};

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngMatModule,
    LoginModule,
    AppRoutingModule,
    BreadcrumbModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    StoreModule.forRoot({
      user: userReducer,
      message: messagingReducer,
      loading: loadingReducer
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
