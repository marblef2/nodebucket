/**
 * Date: 11 August 2021
 * Author: Richard Krasso
 * Modified: Fred Marble
 * Description:Creating the routes for the application.
 */
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/auth.guard';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { NotFoundComponent }  from './pages/not-found/not-found.component';
import { AboutUsComponent }   from './pages/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        canActivate:[AuthGuard]
      }
    ],

  },
  {
    path:'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/not-found'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
