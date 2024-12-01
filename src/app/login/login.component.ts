import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router service
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // For reactive forms
import { HttpClient, HttpClientModule } from '@angular/common/http'; // For loading JSON data
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule] ,// Import necessary modules
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  users: any[] = []; // To store the list of users

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private authService: AuthService,
              private router: Router  // Inject Router service
  ) 
    {
    // Create the form with username and password fields
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });


  }




  // Function to handle login logic
  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Form is invalid';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/customer-landing']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    })
  
  }
}
