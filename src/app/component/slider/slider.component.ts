import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../services/api.service';

interface SliderItem {
  title: string;
  description: string;
  image: string;
  image_url?: string;
  product_url?: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    lazyLoad: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  sliderItems: SliderItem[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTopSliders().subscribe(
      (response: any) => {
        console.log('Fetched data from API:', response);
        this.sliderItems = response.data || response;
        console.log(this.sliderItems);
      },
      (error) => {
        console.error('Error fetching sliders:', error);
      }
    );
  }
}
