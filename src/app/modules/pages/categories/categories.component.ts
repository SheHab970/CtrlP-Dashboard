import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Categories } from '../../../core/interface/categories';
import { CategoryService } from '../../../core/services/category.service';
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
  ],
  providers: [MessageService], // Combine providers into one array
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  Categories: Categories[] = [];
  messageService: any;
  constructor(private router: Router) {}
  statuses!: SelectItem[];
  CategoryService = inject(CategoryService);

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.CategoryService.getCategories().subscribe({
      next: (data) => {
        this.Categories = data;
        console.log(this.Categories);
      },
    });
  }

  addCategory() {
    this.router.navigate(['/dashboard/addCategory']);
  }

  deleteCategory(CategoryId: number, index: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.CategoryService.deleteCategory(CategoryId).subscribe({
        next: () => {
          console.log(`Category with ID ${CategoryId} deleted successfully.`);
          this.Categories.splice(index, 1);
          this.fetchCategories();
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete the category. Please try again.',
          });
        },
      });
    }
  }
}
