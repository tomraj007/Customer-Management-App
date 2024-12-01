import { Routes } from '@angular/router';
import { CustomerLandingComponent } from './customer-landing.component';
import { CuatomerListComponent } from '../cuatomer-list/cuatomer-list.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

export const CUSTOMER_LANDING_ROUTES: Routes = [
  {
    path: '',
    component: CustomerLandingComponent,
    children: [
      { path: '', redirectTo: 'customer-list', pathMatch: 'full' }, // Default child route
      { path: 'customer-list', component: CuatomerListComponent },  // Child route 1
      { path: 'customer-details/:id', component: CustomerDetailsComponent }, // Child route 2
      { path: 'customer-form', component: CustomerFormComponent },  // Child route 3
      { path: 'customer-form/:id', component: CustomerFormComponent }
    ],
  },
];
