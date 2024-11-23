import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { WishlistService } from '../../services/wishlist.service';
import { ProductGridComponent } from '../product-grid/product-grid.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    RouterLink,
    BreadcrumbComponent,
    ProductGridComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  price_arr = {
    '0-20': 'Less than Rs 20',
    '21-50': 'Rs 21 to Rs 50',
    '51-100': 'Rs 51 to Rs 100',
    '101-200': 'Rs 101 to Rs 200',
    '201-500': 'Rs 201 to Rs 500',
    '501-900000': 'More than Rs 501',
  };

  discount_arr = {
    '1-5': 'Upto 5%',
    '5-10': '5% - 10%',
    '10-15': '10% - 15%',
    '15-20': '15% - 20%',
    '25-100': 'More than 25%',
  };

  products: any[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.apiService.getLatestProducts().subscribe(
      (response: any) => {
        console.log('Fetched data from API:', response);
        this.products = response.data || response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Add to addToCart function
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  // Add to Wishlist function
  addToWishlist(item: any) {
    this.wishlistService.addToWishlist(item);
  }
}
