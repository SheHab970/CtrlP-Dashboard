import { Categories } from '../../../core/interface/categories';
import { ProductService } from '../../../core/services/product.service';
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
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-massage',
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
    MultiSelectModule,
  ],
  providers: [MessageService], // Combine providers into one array
  templateUrl: './massage.component.html',
  styleUrl: './massage.component.scss',
})
export class MassageComponent implements OnInit {
  Categories: Categories[] = [];
  constructor(private router: Router) {}
  statuses!: SelectItem[];
  ProductService = inject(ProductService);
  cities!: any[];

  selectedCities!: any[];
  ngOnInit(): void {
    this.ProductService.getcategories().subscribe({
      next: (value) => {
        this.Categories = value.data;
      },
    });

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
