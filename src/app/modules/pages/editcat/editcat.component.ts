import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-editcat',
  standalone: true,
  imports: [FormsModule, Toast],
  templateUrl: './editcat.component.html',
  styleUrl: './editcat.component.scss',
  providers: [MessageService],
})
export class EditcatComponent {
  name: string = '';
  selectedFile: File | null = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private CategoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.CategoryService.getCategoryById(Number(this.id)).subscribe({
      next: (data) => {
        this.name = data.name;
      },
      error: (error) => {
        console.error('Error getting product:', error);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Get the first (and only) selected file
    }
  }

  sendData(): void {
    const formData = new FormData();
    formData.append('Id', this.id!);
    formData.append('Name', this.name);
    formData.append('Image', this.selectedFile!);

    this.CategoryService.editCategory(formData).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category updated successfully!',
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard/categories']);
        }, 1000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to edit category. Please try again.',
        });
      },
      complete: () => {
        console.log('Request complete.');
      },
    });
  }
}
