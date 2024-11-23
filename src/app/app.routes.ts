import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ContactComponent } from './component/contact/contact.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { IndexComponent } from './component/index/index.component';
import { AboutComponent } from './component/about/about.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './component/account/dashboard/dashboard.component';
import { OrdersComponent } from './component/account/orders/orders.component';
import { DetailsComponent } from './component/account/details/details.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { OrderListingComponent } from './component/order-listing/order-listing.component';
import { LoginRegisterComponent } from './component/login-register/login-register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  {
    path: 'category/:slug',
    loadComponent: () =>
      import('./component/category/category.component').then(
        (m) => m.CategoryComponent
      ),
  },

  { path: 'contact', component: ContactComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'index', component: IndexComponent },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'login', component: LoginRegisterComponent },

  {
    path: 'productDetails/:id',
    loadComponent: () =>
      import('./component/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },

  { path: 'wishlist', component: WishlistComponent },

  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'order-details/:id', component: OrderDetailsComponent },
    ],
  },

  { path: 'order-listing', component: OrderListingComponent },
];
