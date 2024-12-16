import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  addForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  cat = this.addForm.value;
  handle(): void {
    console.log(this.cat);
  }
}
