import { Users } from '../../../core/interface/users';
import { UsersService } from './../../../core/services/users.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterComponent } from '../../authentication/pages/register/register.component';

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
    RegisterComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: Users[] = [];

  constructor(private usersService: UsersService) {}

  private modalService = inject(NgbModal);

  ngOnInit(): void {
    this.usersService.GetUSer().subscribe({
      next: (data: Users[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  openRegisterForm(): void {
    const modalRef = this.modalService.open(RegisterComponent, {
      centered: true,
      backdrop: 'static',
      scrollable: true,
    });
  }

  lockUser(id: number, user: Users): void {
    this.usersService.toggleUser(id).subscribe({
      next: () => {
        user.isLockedOut = !user.isLockedOut;
        console.log(`User ${id} lock state updated to: ${user.isLockedOut}`);
      },
      error: (err) => {
        console.error(`Failed to toggle lock state for user ${id}:`, err);
      },
    });
  }
}
