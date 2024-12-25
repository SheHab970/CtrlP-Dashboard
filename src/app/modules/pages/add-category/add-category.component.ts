import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { Toast, ToastModule } from 'primeng/toast';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    RouterModule,
    DialogModule,
    SelectButtonModule,
    MultiSelectModule,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  constructor(private router: Router) {}
  CategoryService = inject(CategoryService);
  messageService = inject(MessageService);

  Name: string = '';

  selectedFiles: File[] = [];
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  @ViewChild('frameInput') frameInput!: ElementRef;
  note: any;
  showMoreControls: any;

  ngOnInit() {
    console.log('hijjjjjjj');
  }

  // sendData(): void {
  //   const formData = new FormData();
  //   formData.append('Name', this.Name);

  //   this.selectedFiles.forEach((file) => {
  //     formData.append('Image', file);
  //   });

  //   formData.forEach((value, key) => {
  //     console.log(key, value);
  //   });

  //   this.CategoryService.addCategory(formData).subscribe({
  //     next: (data) => {
  //       console.log('Product added successfully:', data);

  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Success',
  //         detail: 'New Product added successfully!',
  //       });

  //     },
  //     error: (error) => {
  //       console.error('Error adding product:', error);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: 'Failed to add Product. Please try again.',
  //       });
  //     },
  //     complete: () => {
  //       console.log('Request complete.');
  //     },
  //   });
  // }

  uploadedImages: string[] = []; // Store the uploaded image URLs

  sendData(): void {
    const formData = new FormData();
    formData.append('Name', this.Name);

    this.selectedFiles.forEach((file) => {
      formData.append('Image', file);
    });

    this.CategoryService.addCategory(formData).subscribe({
      next: (data: any) => {
        this.uploadedImages = data.uploadedImageUrls; // Assuming the API returns image URLs
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: ' New category added successfully!',
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard/categories']);
        }, 1000);
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add category. Please try again.',
        });
      },
    });
  }
}
