import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// ... existing imports ...
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);
  authStateChanged = this.authState.asObservable();
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  // Load users from JSON file
  loadUsers(): Observable<any[]> {
    return this.http.get<any[]>('assets/users.json'); // Adjust path if needed
  }

  // Login by checking username and password in users.json
  login(username: string, password: string): Observable<boolean> {
    return this.loadUsers().pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.isAuthenticated = true;
          localStorage.setItem('auth', 'true');
          return true;
        } else {
          return false;
        }
      })
    );
    this.authState.next(true);
  }

  // Logout function to clear authentication
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('auth');
    this.authState.next(false);
  }

  // Function to check if the user is authenticated
  isLoggedIn(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}
