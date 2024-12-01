import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { JsonPlaceholderService } from '../json-placeholder.service';
import { NotificationService } from '../notification.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
@Component({
  selector: 'app-cuatomer-list',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,NgFor,NgIf],
  templateUrl: './cuatomer-list.component.html',
  styleUrl: './cuatomer-list.component.css'
})
export class CuatomerListComponent {
  currentPage = 1; // Current page
  itemsPerPage = 4; // Number of items per page
  totalPages = 0; // Total number of pages
  searchQuery = ''; // Declare the searchQuery variable here
  errorMessage: string = '';
  // Full list of customers
  customers: { id: number; name: string; email: string }[] = [];
   constructor(private router: Router,private apiService:JsonPlaceholderService,private notificationService:NotificationService) {} // Inject Router
  // Filtered customers based on search query
  filteredCustomers: { id: number; name: string; email: string }[] = [];
  paginatedCustomer: { id: number; name: string; email: string }[] = [];

  ngOnInit(): void {
    this.fetchCustomers(); // Fetch customers from the API

  }

  fetchCustomers(): void {
    this.apiService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data.map((customer: any) => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
        }));
        this.filteredCustomers = [...this.customers]; // Initialize filtered customers
        this.calculatePagination(); // Recalculate pagination after fetching data
      },
      error: (err) => {
        this.errorMessage = 'Failed to load customers';
        console.error(err);
      },
    })
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.apiService.deleteCustomer(id).subscribe({
        next: () => {
          console.log(`Customer with ID ${id} deleted successfully.`);
          this.notificationService.showSuccess(`Customer with ID ${id} deleted successfully!`);
          this.customers = this.customers.filter((customer) => customer.id !== id);
          this.filteredCustomers = [...this.customers];
          this.calculatePagination();
        },
        error: (err) => {
          console.error(`Failed to delete customer with ID ${id}`, err);
          this.notificationService.showError(`Customer with ID ${id} Failed to Deleted!`);
          this.errorMessage = `Failed to delete customer with ID ${id}`;
        },
      });
    }
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage); // Use filtered list for pagination
    this.updatePaginatedCustomers();
  }

  updatePaginatedCustomers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCustomer = this.filteredCustomers.slice(startIndex, endIndex); // Use filtered list for pagination
  }

  applySearch(): void {
    // Filter customers based on the search query
    const query = this.searchQuery.toLowerCase();
    this.filteredCustomers = this.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) || customer.email.toLowerCase().includes(query)
    );

    // Reset pagination to page 1 and recalculate
    this.currentPage = 1;
    this.calculatePagination();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCustomers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCustomers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCustomers();
    }
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  addNewCustomer() {
    console.log('Add new customer');
    this.router.navigate(['customer-landing/customer-form']);
  }

  editCustomer(id: number) {
    this.router.navigate(['customer-landing/customer-form', id]);
  }

 

  goToDetails(id: number) {
    console.log('Go to details of customer with ID:', id);
    this.router.navigate(['customer-landing/customer-details', id]);
  }
}
