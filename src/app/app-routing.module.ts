import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
    { path: 'private', loadChildren: './private/private.module#PrivateModule', canActivate: [ AuthGuard ] },
    { path: 'login', loadChildren: './login/login.module#LoginModule' /* , resolve: { data: UserResolver }  */ }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
