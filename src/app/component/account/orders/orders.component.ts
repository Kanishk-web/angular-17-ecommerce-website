import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: any[] = []; // Initialize orders array
  loading: boolean = false; // Loading state
  error: boolean = false; // Error state

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getOrders(); // Fetch orders on component initialization
  }

  // Method to fetch orders using API service
  getOrders(): void {
    this.loading = true; // Set loading to true before fetching data
    this.apiService.getOrdersData().subscribe(
      (data) => {
        this.orders = data; // Assign API data to orders array
        this.loading = false; // Set loading to false once data is fetched
      },
      (error) => {
        this.loading = false; // Set loading to false in case of error
        this.error = true; // Set error to true to display error message
        console.error('Error fetching orders:', error); // Log error to console
      }
    );
  }
}
