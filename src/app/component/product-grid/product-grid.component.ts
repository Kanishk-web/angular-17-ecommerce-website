import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryComponent } from '../category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, CategoryComponent, HttpClientModule, RouterLink],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent {
  products: any[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.apiService.getLatestProductsForHome().subscribe(
      (response: any) => {
        console.log('Fetched data from API:', response);
        this.products = response.data || response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  loadMore() {}

  // When Add to Cart button is clicked
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  // Add to Wishlist function
  addToWishlist(item: any) {
    this.wishlistService.addToWishlist(item);
  }
}
