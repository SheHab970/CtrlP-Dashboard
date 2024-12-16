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
import Cookies from 'js-cookie';
import { DropdownModule } from 'primeng/dropdown';
import { log } from 'console';

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

  frames: any[] = [];
  materials: any[] = [];
  sizes: any[] = []; // Added sizes array
  selectedFrame: any;
  selectedMaterial: any;
  selectedSize: any; // Added selected size
  displayFrameDialog: boolean = false;
  displayMaterialDialog: boolean = false;
  displaySizeDialog: boolean = false; // For size dialog visibility
  newFrameName: string = '';
  newMaterialName: string = '';
  newSizeName: string = ''; // For size name input

  @ViewChild('frameInput') frameInput!: ElementRef;
  note: any;

  ngOnInit() {
    this.fetchFrames();
    this.fetchMaterials();
    this.fetchSizes(); // Fetch sizes when the component initializes
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

  fetchSizes() {
    this.ProductService.getSize().subscribe({
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

  AddProduct: FormGroup = new FormGroup({
    Name: new FormControl(''),
  });
  handle() {
    console.log(this.AddProduct.value);
  }
}
