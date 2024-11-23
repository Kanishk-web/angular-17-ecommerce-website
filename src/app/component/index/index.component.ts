import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { ProductSliderComponent } from '../product-slider/product-slider.component';
import { ProductGridComponent } from '../product-grid/product-grid.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [SliderComponent, ProductSliderComponent, ProductGridComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {}
