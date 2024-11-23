import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

declare var Razorpay: any;

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  billingAddress: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    BreadcrumbComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;
  productName: string = '';

  userDetails: UserDetails = {
    name: '',
    email: '',
    phone: '',
    shippingAddress: '',
    billingAddress: '',
  };

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Cart items aur cart total fetch kar rahe hain
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.getCartTotal();
    this.productName = this.cartItems.map((item) => item.name).join(', ');
  }

  // Razorpay Payment Integration
  payNow() {
    const amountInPaisa = this.cartTotal * 100;

    const orderData = {
      billing: {
        first_name: this.userDetails.name.split(' ')[0],
        last_name: this.userDetails.name.split(' ')[1] || '',
        address_1: this.userDetails.shippingAddress,
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        email: this.userDetails.email,
        phone: this.userDetails.phone,
      },
      shipping: {
        first_name: this.userDetails.name.split(' ')[0],
        last_name: this.userDetails.name.split(' ')[1] || '',
        address_1: this.userDetails.billingAddress,
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        phone: this.userDetails.phone,
      },
      line_items: this.cartItems.map((item) => ({
        name: item.name,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      payment_method: 'razorpay',
      transaction_id: '',
      customer_note: '',
      status: 'processing',
    };

    // Razorpay Options
    const RazorpayOptions = {
      key: 'rzp_test_1fnGhodGWnjCYj', // Razorpay API key
      amount: amountInPaisa,
      currency: 'INR',
      name: this.userDetails.name,
      description: this.productName,
      handler: (response: any) => {
        orderData.transaction_id = response.razorpay_payment_id;
        this.saveOrder(orderData);
      },
      prefill: {
        name: this.userDetails.name,
        email: this.userDetails.email,
        contact: this.userDetails.phone,
      },
      theme: {
        color: '#007bff',
      },
    };

    const rzp = new Razorpay(RazorpayOptions);
    rzp.open();
  }

  // Order ko save karne ke liye API call
  saveOrder(orderData: any) {
    this.apiService.saveOrder(orderData).subscribe(
      (orderResponse) => {
        console.log('Order saved successfully', orderResponse);
        this.ngZone.run(() => {
          this.router.navigate(['/order-listing']);
        });
      },
      (error) => {
        console.error('Failed to save order', error);
        alert('Failed to place order!');
      }
    );
  }

  // Payment Success Handler
  onPaymentSuccess(response: any) {
    const orderData = {
      userId: this.userDetails.email,
      cartItems: this.cartItems,
      totalAmount: this.cartTotal,
      paymentId: response.razorpay_payment_id,
      orderStatus: 'Paid',
    };

    this.apiService.saveOrder(this.userDetails).subscribe(
      (orderResponse) => {
        this.ngZone.run(() => {
          this.router.navigate(['/order-listing']);
        });
      },
      (error) => {
        console.error('Failed to save order', error);
        alert('Failed to place order!');
      }
    );
  }
}
