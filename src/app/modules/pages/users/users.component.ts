import { Users } from '../../../core/interface/users';
import { UsersService } from './../../../core/services/users.service';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';

import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SearchComponent } from '../../../share/componrnts/search/search.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RatingModule,
    TagModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    SearchComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'], // Fixed the typo here
})
export class UsersComponent implements OnInit {
  users: Users[] = []; // Holds the user data fetched from the service

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.GetUSer().subscribe({
      next: (data: Users[]) => {
        this.users = data; // Assign fetched data to the users array
      },
      error: (err) => {
        console.error('Error fetching users:', err); // Handle any errors
      },
    });
  }

  lockUser(user: Users): void {
    alert(`Locking user: ${user.userName}`);
    user.isLockedOut = !user.isLockedOut; // Toggle lock status for the clicked user
  }
}
