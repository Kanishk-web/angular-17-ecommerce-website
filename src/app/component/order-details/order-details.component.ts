import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  order: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.getOrderDetails(orderId);
    }
  }

  // Fetch order details using order ID

  getOrderDetails(orderId: string): void {
    this.apiService.getOrderDetails(orderId).subscribe({
      next: (response: any) => {
        console.log('Fetch data from api: ', response);
        this.order = response.data || response;
        console.log(this.order);
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.log('Error fetching sliders', error);
      },
    });
  }
}
