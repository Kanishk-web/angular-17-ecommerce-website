import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface UserDetails {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  userDetails: UserDetails = {
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
