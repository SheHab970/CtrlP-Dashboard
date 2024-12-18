import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  errorMassage: string = '';
  passwordVisibility: boolean = false;

  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    console.log('res');
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success == true) {
          localStorage.setItem('TOKEN', res.token.replace(/^"|"$/g, ''));
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    }
  }
}
