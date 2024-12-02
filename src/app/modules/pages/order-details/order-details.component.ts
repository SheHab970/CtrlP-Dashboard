import { NoopAnimationDriver } from '@angular/animations/browser';
import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [TagModule,DropdownModule,NgbDropdownModule,TableModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent{

  products: any[] = [
    {},
    {},
    {},
    {}
  ]



}
