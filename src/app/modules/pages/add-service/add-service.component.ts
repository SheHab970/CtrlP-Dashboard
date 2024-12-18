import { Component, OnInit , inject} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../../core/services/services.service';
import { error } from 'console';
import { File } from 'buffer';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent implements OnInit {

  constructor(private services: ServicesService){}

  private formBuilder = inject(FormBuilder);
  
  add_service = this.formBuilder.group({
    // id: '',
    Name: '',
    Description: '',
    Image: null
  });
  serviceimg : any;
  theimg : any;
// select = null;
  onfileselected(event:any){
    // this.select = event.target.files[0];
    // console.log('the file',this.select);
    // this.serviceimg = new FileReader();
    // this.serviceimg.readAsDataURL(event.target.files[0]);
    // this.serviceimg.onload= () =>{
    //   this.theimg = this.serviceimg.result;
    //   console.log("the image is",event.target.files[0]);
    //   console.log("the image is",this.theimg);
    // }
    

    this.add_service.patchValue({
      Image: event.target.files[0],

    });
    
  }

  onSubmit(): void{
    console.log(this.add_service.value);

    this.services.addServices(this.add_service.value).subscribe({
      next: (res) =>{
      console.log(res);
      },
      error: (err) =>{
        console.log("there are error",err);
        
      }

    }
      
    );
    
  }
  ngOnInit(): void {

  }

}
