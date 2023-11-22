import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbooardComponent } from './dashbooard/dashbooard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApipageComponent } from './apipage/apipage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashbooardComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role:'USER'
    }
  },
  {
    path: 'admin-dashboard',
    component: AdmindashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role:'ADMIN'
    }
  },  
  {
    path: '404-not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'apipage',
    component: ApipageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profilepage',
    component: ProfilepageComponent,
    canActivate: [authGuard],
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
