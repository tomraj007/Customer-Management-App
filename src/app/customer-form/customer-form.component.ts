import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPlaceholderService } from '../json-placeholder.service';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false; // Flag to distinguish between Add and Edit
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: JsonPlaceholderService,
    private notificationService:NotificationService
  ) {
    this.customerForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        suite: [''],
        city: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),
      phone: ['', Validators.required],
      website: [''],
      company: this.fb.group({
        name: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    // Check if we are in Edit mode based on route parameters
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true; // Set edit mode
        this.customerId = +params['id'];
        this.fetchCustomerDetails(this.customerId);
      } else {
        this.isEditMode = false; // Add mode
      }
    });
  }

  fetchCustomerDetails(id: number): void {
    this.apiService.getCustomerDetails(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue(customer); // Populate form with customer details
      },
      error: (err) => {
        console.error('Failed to fetch customer details', err);
      },
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.markFormGroupTouched(this.customerForm); // Ensure all controls are marked
      return;
    }
    if (this.customerForm.valid) {
      if (this.isEditMode) {
        console.log('Edit customer:', this.customerForm.value);
        this.apiService.addCustomer(this.customerForm.value).subscribe({
          next: (response) => {
            console.log('Customer added successfully', response);
            this.notificationService.showSuccess(`Customer updated successfully!`);
            this.router.navigate(['customer-landing/customer-list']);
          },
          error: (err) => {
            this.notificationService.showError(`Customer Failed to Update!`);
            console.error('Failed to add customer', err);
          },
        });
      } else {
        console.log('Add new customer:', this.customerForm.value);
        this.apiService.addCustomer(this.customerForm.value).subscribe({
          next: (response) => {
            console.log('Customer added successfully', response);
            this.notificationService.showSuccess(`Customer Added successfully!`);
            this.router.navigate(['customer-landing/customer-list']);
          },
          error: (err) => {
            this.notificationService.showError(`Customer Failed to Add!`);
            console.error('Failed to add customer', err);
          },
        });
      }
    }
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control); // Recursive call for nested FormGroups
      } else {
        control.markAsTouched(); // Mark control as touched
      }
    });
  }
}
