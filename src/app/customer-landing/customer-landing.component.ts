import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-customer-landing',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgFor,NgIf],
  templateUrl: './customer-landing.component.html',
  styleUrl: './customer-landing.component.css'

})
export class CustomerLandingComponent {

}
