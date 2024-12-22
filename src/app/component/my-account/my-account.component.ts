import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../../services/api.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BreadcrumbComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  // Log out function
  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
