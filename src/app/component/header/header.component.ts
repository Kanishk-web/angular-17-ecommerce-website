import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isSearchPopupOpen: boolean = false;
  cartItems: any[] = [];
  cartItemCount: number = 0;
  cartTotal: number = 0;
  wishlistCount: number = 0;

  menuItems: any[] = [];
  showCategories: boolean = false;
  cartOpen: boolean = false;

  tax = 30;
  delivery = 20;
  discount = 50;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartItemCount = count;
    });

    this.wishlistCount = this.wishlistService.getWishlistCount();
    // this.apiService.getTopMenuList().subscribe(
    //   (response: any) => {
    //     this.menuItems = response.data;
    //     console.log(this.menuItems);
    //     this.cartTotal = this.cartService.getCartTotal();
    //   },
    //   (error) => {
    //     console.error('Error fetching top menu:', error);
    //   }
    // );
  }

  // Navigate to home
  navigateToHome() {
    this.router.navigate(['']);
  }

  // toggleCategories() {
  //   console.log('Dropdown visibility:', 'Toggle Categories Clicked');
  //   this.showCategories = !this.showCategories;
  // }

  // Function to toggle cart visibility
  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  // Remove item from cart
  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  // Get the subtotal of the cart items
  getSubtotal() {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  // Calculate total amount with tax, delivery, and discount
  getTotalAmount() {
    return this.getSubtotal() + this.tax + this.delivery - this.discount;
  }
}
