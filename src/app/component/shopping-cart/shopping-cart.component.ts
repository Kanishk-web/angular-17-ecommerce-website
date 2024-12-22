import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, BreadcrumbComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];

  cartItemCount: number = 0;
  cartTotal: number = 0;

  tax = 30;
  delivery = 20;
  discount = 50;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.updateCartSummary();
    });
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

  // Increase quantity of an item
  increaseQuantity(item: any) {
    this.cartService.updateProductQuantity(item, item.quantity + 1);
  }

  // Decrease quantity of an item
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateProductQuantity(item, item.quantity - 1);
    }
  }

  // Update cart total
  updateCartSummary() {
    this.cartTotal = this.cartItems.reduce((acc, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 0;
      return acc + itemPrice * itemQuantity;
    }, 0);
  }
}
