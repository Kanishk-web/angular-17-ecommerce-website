import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
  orders: any[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private apiService: ApiService,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiService.getOrdersData().subscribe({
      next: (response: any) => {
        console.log('Fetch data from api: ', response);
        this.orders = response.data || response;
        console.log(this.orders);
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.log('Error fetching sliders', error);
      },
    });
  }
}
