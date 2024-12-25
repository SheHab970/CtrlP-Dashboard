import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../share/componrnts/search/search.component';
import { RouterLink, RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { log } from 'node:console';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    ButtonModule,
    TableModule,
    TagModule,
    FormsModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent implements OnInit {

  orders_list: any[] = [];

  constructor(private orders: OrderService){}

  ngOnInit(): void {
    this.orders.getOrders().subscribe((res: any)=>{
      this.orders_list = res;
      console.log(this.orders_list);
      
    });

  }

  getSeverity(status: string) {
    switch (status) {
      case 'Created':
        return 'contrast';
      case 'Packed':
        return 'info'; 
      case 'Delivered':
        return 'success'; 
      default:
        return 'secondary'; 
    }
  }
}
