import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { CustomerLandingComponent } from './customer-landing/customer-landing.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'customer-landing',
        loadChildren: () =>
          import('././customer-landing/customer-landing.routes').then(
            (m) => m.CUSTOMER_LANDING_ROUTES
          ),
          canActivate: [AuthGuard]
      },
      { path: '**', component: LoginComponent }
];
