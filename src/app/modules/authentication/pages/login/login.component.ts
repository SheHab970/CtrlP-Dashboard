import { Component , inject} from '@angular/core';
import { FormsModule, FormBuilder,  ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private auth: AuthService,private router: Router){}

  errorMassage:string = '';
  passwordVisibility: boolean = false;

  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(): void{
    console.log(this.loginForm.status);

    this.router.navigateByUrl("dashboard");

    this.auth.login(this.loginForm.value).subscribe({
      next: (res)=>{
        console.log(res);
        
      }
    });
    
  }

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    }
  }
}
