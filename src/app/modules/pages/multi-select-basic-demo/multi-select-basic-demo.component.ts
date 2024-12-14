import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'multi-select-basic-demo',
  templateUrl: './multi-select-basic-demo.component.html',
  styleUrl: './multi-select-basic-demo.component.scss',
  standalone: true,
  imports: [FormsModule, MultiSelectModule],
})
export class MultiSelectBasicDemo implements OnInit {
  cities!: City[];

  selectedCities!: City[];

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
