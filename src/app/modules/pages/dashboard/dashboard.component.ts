import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from '../../../core/side-navbar/side-navbar.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,SideNavbarComponent,NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  sideNavStatus: boolean = false;

}
