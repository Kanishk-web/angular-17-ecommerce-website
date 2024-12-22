import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-order-listing',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, BreadcrumbComponent],
  templateUrl: './order-listing.component.html',
  styleUrl: './order-listing.component.css',
})
export class OrderListingComponent {
  orders: any[] = [];

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
