import { ProductService } from './../../../core/services/product.service';
import { Categories } from '../../../core/interface/categories';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SearchComponent } from '../../../share/componrnts/search/search.component';
@Component({
  selector: 'app-categories',
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
    RouterModule,
    SearchComponent,
  ],
  providers: [MessageService], // Combine providers into one array
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  Categories: Categories[] = [];
  constructor(private router: Router) {}
  statuses!: SelectItem[];
  ProductService = inject(ProductService);

  ngOnInit(): void {
    this.ProductService.getcategories().subscribe({
      next: (value) => {
        this.Categories = value.data;
      },
    });
  }

  addCategory() {
    this.router.navigate(['/dashboard/addCategory']);
  }
}
