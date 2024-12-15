import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ServicesService } from '../../../core/services/services.service';
import { Services } from '../../../core/interface/services';
import { log } from 'console';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-serv-ices',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    FormsModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './serv-ices.component.html',
  styleUrl: './serv-ices.component.scss'
})
export class ServIcesComponent implements OnInit {

  services: Services[] = [];

  constructor(private services_list: ServicesService){}

  ngOnInit(): void {
    // call API data 
    this.services_list.getServices().subscribe((data: any) =>{
      this.services = data;
    });
    
  }
  
}
