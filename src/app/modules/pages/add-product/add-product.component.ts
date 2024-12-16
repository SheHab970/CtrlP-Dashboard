import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
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
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  ProductService = inject(ProductService);
  messageService = inject(MessageService);
  cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef to manually trigger change detection

  frames: any[] = []; // List of frames for dropdown
  selectedFrame: any; // Selected frame
  displayDialog: boolean = false; // Modal visibility flag
  newFrameName: string = ''; // Input for adding a new frame

  @ViewChild('frameInput') frameInput!: ElementRef;

  private memoryStorage: { [key: string]: any } = {}; // In-memory storage fallback

  ngOnInit() {
    this.fetchFrames(); // Fetch frames when the component initializes
    console.log(this.frames);
  }

  // Fetch the frames list from the API or from cookies (fallback when localStorage is unavailable)
  fetchFrames() {
    if (this.isLocalStorageAvailable()) {
      const storedFrames = localStorage.getItem('frames');
      if (storedFrames) {
        this.frames = JSON.parse(storedFrames); // Load frames from localStorage
        this.cdr.detectChanges(); // Manually trigger change detection to update the UI
      } else {
        this.ProductService.getFrames().subscribe({
          next: (data) => {
            // Update frames list from API and save it to localStorage
            this.frames = data;
            localStorage.setItem('frames', JSON.stringify(this.frames));
            this.cdr.detectChanges(); // Manually trigger change detection to update the UI
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
    } else if (Cookies.get('frames')) {
      // Correct usage of Cookies.get
      const storedFrames = Cookies.get('frames');
      if (storedFrames) {
        this.frames = JSON.parse(storedFrames); // Load frames from cookies
        this.cdr.detectChanges(); // Manually trigger change detection to update the UI
      }
    } else {
      console.warn(
        'localStorage and cookies are not available, using fallback storage'
      );
      // Fallback: Use in-memory storage
      const storedFrames = this.memoryStorage['frames'];
      if (storedFrames) {
        this.frames = storedFrames;
        this.cdr.detectChanges();
      } else {
        this.ProductService.getFrames().subscribe({
          next: (data) => {
            this.frames = data;
            this.memoryStorage['frames'] = this.frames; // Use in-memory storage
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
    }
  }

  // Check if localStorage is available in the current environment
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Add a new frame using the service and store in localStorage or fallback to cookies or memory
  addNewFrame() {
    if (this.newFrameName.trim()) {
      const newFrame = { name: this.newFrameName };

      this.ProductService.addFrame(newFrame).subscribe({
        next: (data) => {
          console.log('Frame added:', data);
          this.frames.push(newFrame); // Add the new frame to the frames array

          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('frames', JSON.stringify(this.frames)); // Save updated frames to localStorage
          } else if (Cookies.get('frames')) {
            Cookies.set('frames', JSON.stringify(this.frames), { expires: 7 }); // Save to cookies
          } else {
            this.memoryStorage['frames'] = this.frames; // Save to in-memory storage
          }

          this.displayDialog = false;
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
      // If no data is entered, show a warning message
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter a frame name before saving.',
      });
    }
  }

  showDialog() {
    this.newFrameName = ''; // Reset input field
    this.displayDialog = true; // Show the dialog
    setTimeout(() => {
      if (this.frameInput) {
        this.frameInput.nativeElement.focus(); // Focus on the input field after showing dialog
      }
    }, 100);
  }

  onFrameSelect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Frame Selected',
      detail: event.value.name,
    });
  }

  closeDialog() {
    this.displayDialog = false; // Close dialog without saving
  }
}
