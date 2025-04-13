import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  signupForm: FormGroup;
  isSubmited: boolean = false;
  loading: boolean = false;
  showPassword: boolean = false;

  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _notification = inject(NotificationService);

  constructor(private authService: AuthService) {
    this.signupForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9_]+$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[.@$!%*?&])[A-Za-z\\d.@$!%*?&]{8,}$')]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.signupForm.invalid) {
      this._notification.error('Por favor, preencha todos os campos corretamente');
      return;
    }

    this.loading = true;
    this.authService.register(this.signupForm.value).subscribe({
      next: (res) => {
        this._notification.success('Registro realizado com sucesso!');
        setTimeout(() => {
          this._router.navigate(['/auth/login']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this._notification.error(err.error?.message || 'Ocorreu um erro ao tentar se registrar');
      }
    });
  }
}
