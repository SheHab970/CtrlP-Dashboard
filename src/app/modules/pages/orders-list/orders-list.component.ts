import { Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../../share/componrnts/search/search.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    SearchComponent,
    ButtonModule,
    TableModule,
    TagModule,
    FormsModule,
    RouterLink,
    RouterModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  products: any[] = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];
  
}
