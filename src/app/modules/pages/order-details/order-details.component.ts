import { Component, OnInit ,inject} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../../core/services/order.service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    TagModule,
    DropdownModule,
    NgbDropdownModule,
    TableModule,
    FormsModule,
    ToastModule,
    CommonModule,],
  providers: [MessageService],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{

  constructor( private order: OrderService, private active: ActivatedRoute, private _UserService: UsersService){}

  Status: any[] | undefined;
  selectedStatus: any;
  orderId!: number;
  orderDetails:any = {};
  messageService = inject(MessageService);
  userInfo: any = {};

  ngOnInit(): void {
    this.orderId = this.active.snapshot.params['id'];

    this.getOrderData();

    this.Status = [
      { orderStatus: 'Created' },
      { orderStatus: 'Packed' },
      { orderStatus: 'Shipped' },
      { orderStatus: 'Delivered' },
  ];
}

  getOrderData(){
    this.order.getOrderDetails(this.orderId).subscribe({
      next: (order)=>{
        this.orderDetails = order;
        const userId = order.userId;
        console.log(userId)
        const productIds = order.orderItems.map((item: any) => item.productId);
        console.log('details',productIds);
        
        // Fetch user details
        this.getUserDetails(userId);

        // Fetch product details for each productId
        // this.getProductDetails(productIds);
        
      },
      error: (err) => {
        console.log('error',err);
        
      },
    });
  }

  getUserDetails(userId: number): void {
    this._UserService.GetUSerDetails(userId).subscribe({
      next: (user) => {
        this.userInfo = user;
        console.log(
          '🚀 ~ OrderDetailsComponent ~ this._UserService.getUserById ~ user:',
          user
        );
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
    });
  }

  changeStatus(){
    console.log('status',this.selectedStatus.orderStatus);
    this.order.changeStatus( this.selectedStatus.orderStatus ,this.orderId).subscribe({
      next: (res)=>{
        this.getOrderData();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'change Status successfully!',
        });
        console.log(res);
      
      },
      error: (err) => {
        console.log('error',err);
        
      },
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
