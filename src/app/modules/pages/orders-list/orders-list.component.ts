import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../../share/componrnts/search/search.component';
import { RouterLink, RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { log } from 'node:console';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
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

  constructor(private order_list: OrderService){}

  ngOnInit(): void {
    this.order_list.getOrders().subscribe((res: any)=>{
      this.orders_list = res;
      console.log(this.orders_list);
      
      // console.log('orders',res);
      
    });
  }
}
