import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_BASE_URL = 'https://ecom.webatsolution.com/laravel-app/api';
  // private authToken = '39|bXY6Jj9keHsrB9l2tIGrEhZf1kxAadx15ZWFuWgR8da28901';
  private authToken = '62|x4EOOratdqQbyGIQwL04xJ5P4Z5iQ6W5kIOsWu3Hf3581dc4';

  constructor(private http: HttpClient) {}

  // Category Services
  getLatestProducts() {
    return this.http.get(
      `https://react.webatsolution.com/admin//wp-json/wc/v3/products?slug`
    );
  }

  // Latest Products Services
  getLatestProductsForHome() {
    return this.http.get(
      `https://react.webatsolution.com/admin/wp-json/wc/v3/products`
    );
  }

  // Offers Products Services
  getOffersProducts() {
    return this.http.get(`
https://react.webatsolution.com/admin//wp-json/wc/v3/products?page=1&per_page=12`);
  }

  // Top Menu Services
  getTopMenuList() {
    return this.http.get(`${this.API_BASE_URL}/topMenu`);
  }

  // Top Sliders Services
  getTopSliders() {
    return this.http.get(
      `https://react.webatsolution.com/admin//wp-json/react/v1/slider`
    );
  }

  // Get User Profile

  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get(`${this.API_BASE_URL}/user/profile`, { headers });
  }

  // Update User Profile

  updateProfile(userDetails: {
    name: string;
    email: string;
    phone: string;
    shippingAddress: string;
    billingAddress: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });

    return this.http.put(`${this.API_BASE_URL}/user/profile`, userDetails, {
      headers,
    });
  }

  // api.service.ts
  getProductById(productId: number) {
    const url = `https://react.webatsolution.com/admin/wp-json/wc/v3/products/${productId}?consumer_key=ck_0355c5422caae1dcddf7d04927f05fc0b3ef2eac&consumer_secret=cs_fbdfc5b9ad887156155c42eddc4aa98877eddd79`;
    return this.http.get<any>(url); // Replace with actual API endpoint
  }

  //Register API Call
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/user/login`, userData);
  }

  // Login API Call
  login(userData: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/user/login`, userData);
  }

  // Logout API Call
  logout(): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/user/logout`, {});
  }

  // Fetch customer data
  getCustomerData(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/user/profile`);
  }

  //Put orders
  postOrdersData(): Observable<any> {
    return this.http.get(
      `https://react.webatsolution.com/admin/wp-json/wc/v3/orders`
    );
  }

  //Get orders
  getOrdersData(): Observable<any> {
    return this.http.get(
      `https://react.webatsolution.com/admin/wp-json/wc/v3/orders`
    );
  }

  //Update orders
  putOrdersData(): Observable<any> {
    return this.http.get(
      `https://react.webatsolution.com/admin/wp-json/wc/v3/orders`
    );
  }

  //Delete orders
  deleteOrdersData(): Observable<any> {
    return this.http.get(
      `https://react.webatsolution.com/admin/wp-json/wc/v3/orders`
    );
  }

  saveOrder(orderData: any): Observable<any> {
    return this.http.post(
      `https://react.webatsolution.com/admin/wp-json/wc/v3/orders`,
      orderData
    );
  }

  // Get Order Details
  getOrderDetails(orderId: string): Observable<any> {
    const url = `https://react.webatsolution.com/admin/wp-json/wc/v3/orders/${orderId}`;
    return this.http.get<any>(url, {
      headers: {
        Authorization: `Basic ${btoa(
          'consumer_key= ck_0355c5422caae1dcddf7d04927f05fc0b3ef2eac:consumer_secret=cs_fbdfc5b9ad887156155c42eddc4aa98877eddd79'
        )}`,
      },
    });
  }
}
