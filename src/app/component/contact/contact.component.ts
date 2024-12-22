import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MapComponent,
    RouterLink,
    HttpClientModule,
    FormsModule,
    BreadcrumbComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
    ]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });
  constructor(private http: HttpClient) {}

  formValue: any;

  ngOnInit(): void {}

  onSave() {
    this.formValue = this.userForm;
  }
}
