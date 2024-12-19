import { NgClass } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, NgClass],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss',
})
export class SideNavbarComponent {

  constructor(private auth: AuthService){}

  @Output() sindeNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  SindeNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sindeNavToggled.emit(this.menuStatus);
    console.log(this.menuStatus);
  }

  getName(){
    const adminName = this.auth.getUserDetails();
    return adminName?.name;
  }

  logout(){
    this.auth.logOut();
  }

}
