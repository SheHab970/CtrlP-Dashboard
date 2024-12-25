import { Component, OnInit , inject} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../../core/services/services.service';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ToastModule],
  providers: [MessageService],
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.scss'
})
export class UpdateServiceComponent {
  constructor(private services: ServicesService, private router: Router,  private active: ActivatedRoute){}

  private formBuilder = inject(FormBuilder);

  messageService = inject(MessageService);
  
  edit_service = this.formBuilder.group({
    Name: '',
    Description: '',
  });
  Name: any = '';
  Description: any = '';
  select: File[] = [];
  serviceId: any;
  editService: any;

  setData(){
    this.Name = this.edit_service.value.Name;
    this.Description = this.edit_service.value.Description;
  }
  onfileselected(event:any){
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.select = Array.from(input.files);
    }    
  }

  onSubmit(): void{
    this.setData();
    const formData = new FormData();
    formData.append('Id', this.serviceId);
    formData.append('Name', this.Name);
    formData.append('Description', this.Description);
    this.select.forEach((file) => {
      formData.append('Image', file);
    });

    this.services.updateService(formData).subscribe({
      next: (res) =>{
      console.log(res);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Update service successfully!',
      });
      setTimeout(() => {
        this.router.navigate(['/dashboard/services']);
      }, 1000);
      },
      error: (err) =>{
        console.log("there are error",err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error. Please try again.',
        });   
      }

    }
      
    );
    
  }
  ngOnInit(): void {
    this.serviceId = this.active.snapshot.params['id'];
    const name: string = '';
    const description: string = '';
    this.services.getServices().subscribe({
      next: (res) =>{
      // console.log(res);
      this.editService = res.find((item: { id: number }) => item.id === Number(this.serviceId));
      console.log(this.editService);
      
      },
      error: (err) =>{
        console.log("there are error",err);
 
      }

    });
  }
}
