import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectModule],
  providers: [MessageService],
})
export class EditProductComponent implements OnInit {
  product: any = {
    name: '',
    description: '',
    price: null,
    oldPrice: null,
    unitsInStock: null,
    url: [], // Array for image URLs
    categoryNames: [],
    framesNames: [],
    materialsNames: [],
    sizesNames: [],
  };
  id: any;
  frames: any[] = [];
  materials: any[] = [];
  categories: any[] = [];
  sizes: any[] = [];

  FramesNames: string[] = [];
  MaterialsNames: string[] = [];
  SizesNames: string[] = [];
  CategoryNames: string[] = [];
  selectedFiles: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private messageService: MessageService,
    private router: Router
  ) {}

  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchFrames();
    this.fetchMaterials();
    this.fetchSizes();
    this.id = this.route.snapshot.paramMap.get('id'); // Get the product ID from route params

    this.ProductService.getProductBYid(this.id).subscribe({
      next: (data) => {
        this.product = data;
        this.FramesNames.push(...data.framesNames);
        this.MaterialsNames.push(...data.materialsNames);
        this.SizesNames.push(...data.sizesNames);
        this.CategoryNames.push(...data.categoryNames);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load product data',
        });
      },
    });
  }

  fetchFrames() {
    this.ProductService.getFrames().subscribe({
      next: (data) => {
        this.frames = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching frames:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch frames. Try again later.',
        });
      },
    });
  }

  fetchMaterials() {
    this.ProductService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching materials:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch materials. Try again later.',
        });
      },
    });
  }

  fetchCategories() {
    this.ProductService.getCatlist().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch categories. Try again later.',
        });
      },
    });
  }

  fetchSizes() {
    this.ProductService.getSizes().subscribe({
      next: (data: any) => {
        this.sizes = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error fetching sizes:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch sizes. Try again later.',
        });
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }
  // Function to update the product
  updateProduct() {
    const formData = new FormData();
    formData.append('Id', this.product.id);
    formData.append('Name', this.product.name);
    formData.append('Description', this.product.description);
    formData.append('Price', this.product.price.toString());
    formData.append('OldPrice', this.product.oldPrice.toString());
    formData.append('UnitsInStock', this.product.unitsInStock.toString());
    this.CategoryNames.forEach((categoryName: any) => {
      formData.append('CategoryNames', categoryName.name);
    });

    this.FramesNames.forEach((frameName: any) => {
      formData.append('FramesNames', frameName.name);
    });

    this.SizesNames.forEach((sizeName: any) => {
      formData.append('SizesNames', sizeName.name);
    });

    this.MaterialsNames.forEach((materialName: any) => {
      formData.append('MaterialsNames', materialName.name);
    });

    this.selectedFiles.forEach((file) => {
      formData.append('Image', file);
    });

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.ProductService.UpdateProduct(formData).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: ' Product updated successfully!',
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard/Product']);
        }, 1000);
      },

      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update product. Please try again.',
        });
      },
    });
  }
}
