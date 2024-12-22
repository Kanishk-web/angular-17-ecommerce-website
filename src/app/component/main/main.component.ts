import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { IndexComponent } from '../index/index.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { SliderComponent } from '../slider/slider.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    ProductCartComponent,
    SliderComponent,
    HomeComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
