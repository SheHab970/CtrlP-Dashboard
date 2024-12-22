import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { SearchComponent } from '../../../share/componrnts/search/search.component';
import { ProductService } from './../../../core/services/product.service';
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
  list: any[] = [];
  ProductService = inject(ProductService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.ProductService.getProductlist().subscribe((data: any) => {
      this.list = data.map((product: any) => ({
        ...product,
        inventoryStatus: this.getDefaultStatus(product), // Assign a status
      }));

      console.log(data);

      this.statuses = [
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' },
      ];
    });
  }

  getDefaultStatus(product: any): string {
    // Example logic for assigning status based on price (customize as needed)
    if (product.unitsInStock > 10) {
      return 'INSTOCK';
    } else if (product.unitsInStock <= 10) {
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
  delete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.ProductService.deleteProduct(productId).subscribe({
        next: () => {
          this.fetchData();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Successfully deleted product',
          });
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete product',
          });
        },
      });
    }
  }
}
