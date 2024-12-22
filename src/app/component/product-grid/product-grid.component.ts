import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent {
  products: any[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiService.getLatestProductsForHome().subscribe({
      next: (response: any) => {
        console.log('Fetch data from api: ', response);
        this.products = response.data || response;
        console.log(this.products);
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.log('Error fetching sliders', error);
      },
    });
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
