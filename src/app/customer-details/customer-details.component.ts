import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPlaceholderService } from '../json-placeholder.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'
@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  customerId: number | null = null;
  customer: any = null;
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: JsonPlaceholderService
  ) {}

  ngOnInit(): void {
    // Get the customer ID from the route
    this.route.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('id'));
      if (this.customerId) {
        this.fetchCustomerDetails(this.customerId);
      }
    });
  }

  fetchCustomerDetails(id: number): void {
    this.apiService.getCustomerDetails(id).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load customer details.';
        console.error(err);
      },
    });
  }

  goBack(){
    this.router.navigate(['customer-landing']);
  }
}
