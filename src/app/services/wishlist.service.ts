import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems = new BehaviorSubject<any[]>(
    this.getWishlistItemsFromLocalStorage()
  );
  wishlistItems$ = this.wishlistItems.asObservable();

  constructor() {}

  // Add item to wishlist
  addToWishlist(product: any) {
    const items = this.wishlistItems.getValue();
    const index = items.findIndex((item) => item.name === product.name);

    if (index === -1) {
      items.push(product);
    }

    this.wishlistItems.next(items);
    this.saveWishlistItemsToLocalStorage(items);
  }

  // Remove item from wishlist
  removeFromWishlist(product: any) {
    let items = this.wishlistItems.getValue();
    items = items.filter((item) => item.name !== product.name);

    this.wishlistItems.next(items);
    this.saveWishlistItemsToLocalStorage(items);
  }

  // Get wishlist items
  getWishlistItems() {
    return this.wishlistItems.value;
  }

  // Get wishlist count
  getWishlistCount(): number {
    return this.wishlistItems.value.length;
  }

  private saveWishlistItemsToLocalStorage(items: any[]) {
    localStorage.setItem('wishlistItems', JSON.stringify(items));
  }

  private getWishlistItemsFromLocalStorage(): any[] {
    const items = localStorage.getItem('wishlistItems');
    return items ? JSON.parse(items) : [];
  }
}
