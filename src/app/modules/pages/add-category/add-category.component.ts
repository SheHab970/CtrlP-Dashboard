import { CategoryService } from './../../../core/services/category.service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  CategoryService = inject(CategoryService);
  addForm: FormGroup = new FormGroup({
    Id: new FormControl(''),
    Name: new FormControl(''),
    Image: new FormControl(''),
  });

  cat = this.addForm.value;
  handle(): void {}
}
