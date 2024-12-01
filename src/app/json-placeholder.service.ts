import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {

  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/users`);
  }

  getCustomerDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/users/${id}`);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/users`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/users/${id}`);
  }
}
