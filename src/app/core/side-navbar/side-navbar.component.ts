import { NgClass } from '@angular/common';
import { Component, Output,EventEmitter } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [RouterLink,RouterModule,NgClass],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  @Output() sindeNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  SindeNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sindeNavToggled.emit(this.menuStatus);
    console.log(this.menuStatus);
    
  }

}
