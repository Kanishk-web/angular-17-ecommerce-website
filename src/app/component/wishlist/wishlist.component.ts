import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CurrencyPipe,
    CommonModule,
    BreadcrumbComponent,
    RouterLink,
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistCount: number = 0;
  wishlistProducts$: Observable<any[]>;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {
    this.wishlistProducts$ = this.wishlistService.wishlistItems$;
  }

  ngOnInit(): void {
    this.wishlistCount = this.wishlistService.getWishlistCount();
  }

  // Wishlist me item add karne ka method
  addToWishlist(item: any) {
    this.wishlistService.addToWishlist(item);
    this.wishlistCount = this.wishlistService.getWishlistCount();
  }

  // Method to remove product from wishlist
  removeFromWishlist(item: any) {
    this.wishlistService.removeFromWishlist(item);
  }

  // When Add to Cart button is clicked
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
}
