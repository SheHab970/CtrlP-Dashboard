import { ProductService } from './../../../core/services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { MessageService, SelectItem } from 'primeng/api';
import { list } from '../../../core/interface/product';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { SearchComponent } from '../../../share/componrnts/search/search.component';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RatingModule,
    TagModule,
    ToastModule,
    RouterLink,
    DropdownModule,
    InputTextModule,
    RouterModule,
    SearchComponent,
  ],
  providers: [MessageService], // Combine providers into one array
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  constructor(private router: Router) {}
  statuses!: SelectItem[];
  list: list[] = [];
  ProductService = inject(ProductService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.ProductService.getProductlist().subscribe((data: any) => {
      this.list = data.data.map((product: any) => ({
        ...product,
        inventoryStatus: this.getDefaultStatus(product), // Assign a status
      }));

      this.statuses = [
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' },
      ];
    });
  }

  getDefaultStatus(product: any): string {
    // Example logic for assigning status based on price (customize as needed)
    if (product.price > 200) {
      return 'INSTOCK';
    } else if (product.price > 50) {
      return 'LOWSTOCK';
    } else {
      return 'OUTOFSTOCK';
    }
  }
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success'; // Green
      case 'LOWSTOCK':
        return 'warn'; // Yellow (corrected from 'warning')
      case 'OUTOFSTOCK':
        return 'danger'; // Red
      default:
        return 'secondary'; // Default fallback
    }
  }

  addProduct() {
    this.router.navigate(['/dashboard/addProduct']);
  }
}
