import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink],
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css'],
})
export class ProductSliderComponent implements OnInit {
  products: any[] = [];
  carouselOptions = {
    items: 5,
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<', '>'],
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 5 },
    },
  };

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.apiService.getOffersProducts().subscribe(
      (response: any) => {
        console.log('Fetched data from API:', response);
        this.products = response.data || response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  toggleCart() {}

  // When Add to Cart button is clicked
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  // Add to Wishlist function
  addToWishlist(item: any) {
    this.wishlistService.addToWishlist(item);
  }
}