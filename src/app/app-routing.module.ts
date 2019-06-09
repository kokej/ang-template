import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './public/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      breadcrumb: 'home'
    }
  },
  {
    path: 'about',
    loadChildren: './public/about/about.module#AboutModule',
    data: {
      breadcrumb: 'about'
    }
  },
  {
    path: 'private',
    loadChildren: './private/private.module#PrivateModule',
    data: {
      breadcrumb: 'private'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'playground',
    loadChildren: './public/playground/playground.module#PlaygroundModule',
    data: {
      breadcrumb: 'playground'
    } /* , canActivate: [ AuthGuard ]  */
  },
  {
    path: 'not-found',
    loadChildren: './public/not-found/not-found.module#NotFoundModule',
    data: {
      breadcrumb: 'not-found'
    }
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }

  /*     { path: 'login', loadChildren: './login/login.module#LoginModule' /* , resolve: { data: UserResolver }   }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
