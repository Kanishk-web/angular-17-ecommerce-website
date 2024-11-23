import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(
    this.getCartItemsFromLocalStorage()
  );
  cartItems$ = this.cartItems.asObservable();

  private cartCount = new BehaviorSubject<number>(this.getInitialCartCount());
  cartCount$ = this.cartCount.asObservable();

  constructor() {}

  // Add item to cart
  addToCart(product: any) {
    const items = this.cartItems.getValue();
    const index = items.findIndex((item) => item.name === product.name);

    if (index === -1) {
      product.quantity = 1;
      items.push(product);
    } else {
      items[index].quantity += 1;
    }

    this.cartItems.next(items);
    this.updateCartCount();
    this.saveCartItemsToLocalStorage(items);
  }

  // Remove item from cart
  removeFromCart(product: any) {
    let items = this.cartItems.getValue();
    items = items.filter((item) => item.name !== product.name);

    this.cartItems.next(items);
    this.updateCartCount();
    this.saveCartItemsToLocalStorage(items);
  }

  // Update quantity of product in cart
  updateProductQuantity(product: any, quantity: number) {
    const items = this.cartItems.getValue();
    const index = items.findIndex((item) => item.name === product.name);

    if (index !== -1) {
      items[index].quantity = quantity;
      this.cartItems.next(items);
      this.updateCartCount();
      this.saveCartItemsToLocalStorage(items);
    }
  }

  // Get initial cart count from localStorage
  private getInitialCartCount(): number {
    const items = this.getCartItemsFromLocalStorage();
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }

  // Update cart count
  private updateCartCount() {
    const items = this.cartItems.getValue();
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount.next(count);
  }

  // Save cart items to localStorage
  private saveCartItemsToLocalStorage(items: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  // Get cart items from localStorage
  private getCartItemsFromLocalStorage(): any[] {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  }

  // Get total amount for the order summary
  getCartTotal() {
    const currentItems = this.cartItems.value;
    return currentItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Get cart items
  getCartItems() {
    return this.cartItems.value;
  }
}
