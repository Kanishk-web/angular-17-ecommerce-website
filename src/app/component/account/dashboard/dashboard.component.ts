import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // Example data that you can show on the dashboard
  recentOrders: any[] = [
    { orderId: 'ORD123', date: '2024-10-20', total: 2500, status: 'Delivered' },
    { orderId: 'ORD124', date: '2024-10-18', total: 1500, status: 'Shipped' },
    {
      orderId: 'ORD125',
      date: '2024-10-16',
      total: 3000,
      status: 'Processing',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // You can fetch API data here if needed
    // Example: this.getRecentOrders();
  }

  // Optional: Method to fetch data from an API (You can add a service for this)
  // getRecentOrders() {
  //   // Call your API service here and assign data to recentOrders array
  // }
}
