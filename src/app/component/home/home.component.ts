import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, IndexComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
