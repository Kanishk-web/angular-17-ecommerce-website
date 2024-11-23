import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterLink,
    HttpClientModule,
    BreadcrumbComponent,
  ],
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
    private wishlistService: WishlistService
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

    this.apiService.getProductById(productId).subscribe(
      (response) => {
        console.log('API response:', response);
        this.product = response;
      },
      (error) => {
        console.error('Error fetching product details:', error);
        if (error.status === 404) {
          console.log('Product not found. Please verify the Product ID.');
        } else {
          console.log('An unknown error occurred.');
        }
      }
    );
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
