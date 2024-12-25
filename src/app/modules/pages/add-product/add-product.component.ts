import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
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
import { ToastModule } from 'primeng/toast';
import { Cat } from '../../../core/interface/cat';
import { Frame } from '../../../core/interface/frame';
import { Material } from '../../../core/interface/material';
import { Size } from '../../../core/interface/size';
import { ProductService } from '../../../core/services/product.service';

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
  ],
  providers: [MessageService],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(private router: Router) {}
  ProductService = inject(ProductService);
  messageService = inject(MessageService);
  cdr = inject(ChangeDetectorRef);
  Name: string = '';
  Description: string = '';
  Price: number = 0;
  OldPrice: number = 0;
  UnitsInStock: number = 1;
  selectedFrame: Frame[] = [];
  CategoryNames: Cat[] = [];
  selectedMaterial: Material[] = [];
  selectedSize: Size[] = [];
  selectedFiles: File[] = [];
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }
  frames: any[] = [];
  materials: any[] = [];
  categories: any[] = [];
  sizes: any[] = [];
  displayFrameDialog: boolean = false;
  displayMaterialDialog: boolean = false;
  displaySizeDialog: boolean = false;
  newFrameName: string = '';
  newMaterialName: string = '';
  newSizeName: string = '';
  @ViewChild('frameInput') frameInput!: ElementRef;
  note: any;
  showMoreControls: any;

  ngOnInit() {
    this.fetchFrames();
    this.fetchMaterials();
    this.fetchSizes();
    this.fetchCategories();
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
        console.error('Error fetching materials:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch materials. Try again later.',
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

  // Show the frame dialog
  showFrameDialog() {
    this.newFrameName = '';
    this.displayFrameDialog = true;
    setTimeout(() => {
      if (this.frameInput) {
        this.frameInput.nativeElement.focus();
      }
    }, 100);
  }

  // Show the material dialog
  showMaterialDialog() {
    this.newMaterialName = '';
    this.displayMaterialDialog = true;
  }

  // Show the size dialog
  showSizeDialog() {
    this.newSizeName = '';
    this.displaySizeDialog = true;
  }

  // Add a new frame
  addNewFrame() {
    if (this.newFrameName.trim()) {
      const newFrame = { name: this.newFrameName };
      this.ProductService.addFrame(newFrame).subscribe({
        next: (data) => {
          this.frames.push(newFrame);
          this.displayFrameDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New frame added successfully!',
          });
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error adding frame:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add frame. Please try again.',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter a frame name before saving.',
      });
    }
  }

  // Add a new material
  addNewMaterial() {
    if (this.newMaterialName.trim()) {
      const newMaterial = { name: this.newMaterialName };
      this.ProductService.addMaterial(newMaterial).subscribe({
        next: (data) => {
          this.materials.push(newMaterial);
          this.displayMaterialDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New material added successfully!',
          });
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error adding material:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add material. Please try again.',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter a material name before saving.',
      });
    }
  }

  // Add a new size
  addNewSize() {
    if (this.newSizeName.trim()) {
      const newSize = { name: this.newSizeName };
      this.ProductService.addSize(newSize).subscribe({
        next: (data) => {
          this.sizes.push(newSize);
          this.displaySizeDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New size added successfully!',
          });
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error adding size:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add size. Please try again.',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter a size name before saving.',
      });
    }
  }

  // Close dialog without saving
  closeDialog() {
    this.displayFrameDialog = false;
    this.displayMaterialDialog = false;
    this.displaySizeDialog = false;
  }

  sendData(): void {
    const formData = new FormData();
    formData.append('Name', this.Name);
    formData.append('Description', this.Description);
    formData.append('Price', this.Price.toString());
    formData.append('OldPrice', this.OldPrice.toString());
    formData.append('UnitsInStock', this.UnitsInStock.toString());
    this.CategoryNames.forEach((categoryName: any) => {
      formData.append('CategoryNames', categoryName.name);
    });

    this.selectedFrame.forEach((frameName: any) => {
      formData.append('FramesNames', frameName.name); // assuming frame has 'name' property
    });

    this.selectedSize.forEach((sizeName: any) => {
      formData.append('SizesNames', sizeName.name); // assuming size has 'name' property
    });

    this.selectedMaterial.forEach((materialName: any) => {
      formData.append('MaterialsNames', materialName.name); // assuming material has 'name' property
    });

    this.selectedFiles.forEach((file) => {
      formData.append('Image', file);
    });

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.ProductService.addProduct(formData).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New Product added successfully!',
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard/Product']);
        }, 1000);
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add Product. Please try again.',
        });
      },
      complete: () => {
        console.log('Request complete.');
      },
    });
  }
}
