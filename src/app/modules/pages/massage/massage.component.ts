import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Categories } from '../../../core/interface/categories';
import { ProductService } from '../../../core/services/product.service';
import { SearchComponent } from '../../../share/componrnts/search/search.component';

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

  ngOnInit(): void {
    this.ProductService.getCatlist().subscribe({
      next: (value: any) => {
        this.Categories = value;
      },
    });
  }
}
