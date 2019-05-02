import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './service/auth-guard.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebase = {
    apiKey: 'AIzaSyB7UK6myQ46umsRa0WdQHBR0RqRyjxVEwo',
    authDomain: 'user-manager-5aa3d.firebaseapp.com',
    databaseURL: 'https://user-manager-5aa3d.firebaseio.com',
    projectId: 'user-manager-5aa3d',
    storageBucket: 'user-manager-5aa3d.appspot.com',
    messagingSenderId: '413823349307'
};

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, AppRoutingModule, AngularFireModule.initializeApp(firebase), AngularFireAuthModule ],
    providers: [ AuthGuard ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
