import { Categories } from '../../../core/interface/categories';
import { ProductService } from '../../../core/services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MultiSelectModule,
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

    MultiSelectModule,
  ],
  providers: [MessageService], // Combine providers into one array
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  cities!: any[];

  selectedCities!: any[];

  ngOnInit(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  onSelectionChange() {
    if (this.selectedCities.length > 1) {
      this.selectedCities = [
        this.selectedCities[this.selectedCities.length - 1],
      ];
    }
  }

  // Single selected city (or frame)
  selectedCity: any;
}
