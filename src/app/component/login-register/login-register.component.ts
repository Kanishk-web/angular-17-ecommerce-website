import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  activeForm: 'login' | 'register' = 'login';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.router.navigate(['/my-account']);
    }
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  loginUser(formValues: any) {
    this.apiService.login(formValues).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/my-account']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  registerUser(formValues: any) {
    this.apiService.registerUser(formValues).subscribe(
      (response) => {
        this.toggleForm('login');
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
