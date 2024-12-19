import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { MessageService } from 'primeng/api';
// import { Product } from '../../../models/product.mod'; // Assuming you have a Product model
import { list } from '../../../core/interface/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  standalone: true,
})
export class EditProductComponent implements OnInit {
  ngOnInit(): void {}
}
