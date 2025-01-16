import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmited: boolean = false;
  CREDENTIALS_ERROR: number = 401;
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  constructor(private authService: AuthService) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmited = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this._router.navigate(['/home']);
        },
        error: (err) => {
          if (err.status === this.CREDENTIALS_ERROR) {
            console.log('Sim é 401');
          }
        },
      });
    } else {
      this.isSubmited = true;
      setTimeout(() => {
        this.isSubmited = false;
      }, 5000);
      console.log(this.loginForm);
    }
  }
}
