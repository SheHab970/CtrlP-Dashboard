import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../core/services/product.service';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { log } from 'console';
interface Frame {
  name: string;
}

interface Size {
  name: string;
}
interface cat {
  name: string;
}

interface Material {
  name: string;
}
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
  ProductService = inject(ProductService);
  messageService = inject(MessageService);
  cdr = inject(ChangeDetectorRef);
  Name: string = '';
  Description: string = '';
  Price: number = 0;
  OldPrice: number = 0;
  UnitsInStock: number = 0;
  // ProductCategoryIds: [] = [];
  //  ProductFrameIds:[]=[]
  selectedFrame: Frame[] = [];
  CategoryNames: cat[] = [];
  selectedMaterial: Material[] = [];
  selectedSize: Size[] = [];

  selectedFiles: File[] = [];
  // sendData(): void {
  //   const data = {
  //     name: this.Name,
  //     describe: this.Description,
  //     price: this.Price,
  //     oldprice: this.OldPrice,
  //     unit: this.UnitsInStock,
  //     category: this.ProductCategoryIds,
  //     frame: this.selectedFrame,
  //     MaterialsNames: this.selectedMaterial,
  //   };

  //   console.log(data);
  // }

  // Handle file input change
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files); // Convert FileList to Array
    }
  }

  frames: any[] = [];
  materials: any[] = [];
  categories: any[] = [];
  sizes: any[] = []; // Added sizes array // Added selected size
  displayFrameDialog: boolean = false;
  displayMaterialDialog: boolean = false;
  displaySizeDialog: boolean = false; // For size dialog visibility
  newFrameName: string = '';
  newMaterialName: string = '';
  newSizeName: string = ''; // For size name input

  @ViewChild('frameInput') frameInput!: ElementRef;
  note: any;
  showMoreControls: any;

  ngOnInit() {
    this.fetchFrames();
    this.fetchMaterials();
    this.fetchSizes(); // Fetch sizes when the component initializes
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
      next: (data) => {
        this.sizes = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
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

    // Append fields with the same names as properties
    formData.append('Name', this.Name);
    formData.append('Description', this.Description);
    formData.append('Price', this.Price.toString());
    formData.append('OldPrice', this.OldPrice.toString());
    formData.append('UnitsInStock', this.UnitsInStock.toString());

    formData.append(
      'categoryNames',
      JSON.stringify(this.CategoryNames.map((c) => c.name))
    );

    // Append frame, size, and material names
    formData.append(
      'frameName',
      JSON.stringify(this.selectedFrame.map((f) => f.name))
    );
    formData.append(
      'sizeName',
      JSON.stringify(this.selectedSize.map((s) => s.name))
    );
    formData.append(
      'materialNames',
      JSON.stringify(this.selectedMaterial.map((m) => m.name))
    );

    // Append files (images) as an array
    this.selectedFiles.forEach((file) => {
      formData.append('Image', file);
    });

    // Manually loop through FormData for debugging
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.ProductService.addProduct(formData).subscribe({
      next: (data) => {
        console.log('Product added successfully:', data);
        // Additional logic after successful submission (e.g., show a success message)
      },
      error: (error) => {
        console.error('Error adding product:', error);
        // Handle the error (e.g., show an error message to the user)
      },
      complete: () => {
        console.log('Request complete.');
        // Logic when the request is complete (successful or not)
      },
    });
  }
}
