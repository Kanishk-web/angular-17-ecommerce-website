import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BreadcrumbComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiService: ApiService,
    private wishlistService: WishlistService,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!;
      console.log('Product ID:', this.productId);

      this.fetchProductDetails(this.productId);
    });
  }

  fetchProductDetails(productId: number) {
    console.log('Fetching product details for Product ID:', productId);

    this.apiService.getProductById(productId).subscribe({
      next: (response) => {
        console.log('API response:', response);
        this.product = response;
        console.log(this.product);
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        if (error.status === 404) {
          console.log('Product not found. Please verify the Product ID.');
        } else {
          console.log('An unknown error occurred.');
        }
      },
    });
  }

  // Add to Wishlist function
  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
  }

  // Method to handle Add to Cart functionality
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
}
