import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth-guard.service';
import { HomeComponent } from './public/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', loadChildren: './public/about/about.module#AboutModule' },
    { path: 'private', loadChildren: './private/private.module#PrivateModule', canActivate: [ AuthGuard ] }
    /*     { path: 'login', loadChildren: './login/login.module#LoginModule' /* , resolve: { data: UserResolver }   }*/
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
