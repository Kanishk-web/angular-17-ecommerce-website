import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent {
  cartOpen = false; // Initially, cart is closed

  toggleCart() {
    this.cartOpen = !this.cartOpen; // Toggle cart visibility
  }
}
