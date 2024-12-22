import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, BreadcrumbComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  selectedCategories: string[] = [];
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  // Load all products

  loadProducts(): void {
    this.isLoading = true;
    this.apiService.getProductsData().subscribe({
      next: (response: any) => {
        console.log('Fetch data from api: ', response);
        this.products = response.data || response;
        this.filteredProducts = [...this.products];
        this.isLoading = false;
        console.log(this.products);
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.log('Error fetching sliders', error);
      },
    });
  }

  // Load all categories
  loadCategories(): void {
    this.apiService.getSidebarProducts().subscribe({
      next: (response: any) => {
        console.log('Fetch data from api: ', response);
        this.categories = response.data || response;
        console.log(this.categories);
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.log('Error fetching sliders', error);
      },
    });
  }

  onFilterChange(event: any): void {
    const category = event.target.value; // Checkbox ka value
    if (event.target.checked) {
      this.selectedCategories.push(category); // Add category
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      ); // Remove category
    }
    this.filterProducts(); // Filter products
  }

  filterProducts(): void {
    if (this.selectedCategories.length > 0) {
      this.filteredProducts = this.products.filter((product) =>
        product.categories.some((category: any) =>
          this.selectedCategories.includes(category.name)
        )
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  // Clear all selected filters
  clearFilters(): void {
    this.selectedCategories = [];
    this.filteredProducts = [...this.products];
  }

  // Add product to cart
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  // Add product to wishlist
  addToWishlist(item: any) {
    this.wishlistService.addToWishlist(item);
  }
}
