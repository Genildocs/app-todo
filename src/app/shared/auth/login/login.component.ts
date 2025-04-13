import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmited: boolean = false;
  loading: boolean = false;
  showPassword: boolean = false;

  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _notification = inject(NotificationService);

  constructor(private authService: AuthService) {
    this.loginForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[.@$!%*?&])[A-Za-z\\d.@$!%*?&]{8,}$'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isSubmited = true;
    console.log('Formulário submetido:', this.loginForm.value);

    if (this.loginForm.invalid) {
      console.log('Formulário inválido:', this.loginForm.errors);
      this._notification.error('Por favor, preencha todos os campos corretamente');
      return;
    }

    this.loading = true;
    console.log('Iniciando processo de login...');
    
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login bem sucedido:', res);
        console.log('Token armazenado:', localStorage.getItem('token'));
        
        this._notification.success('Login realizado com sucesso!');
        
        setTimeout(() => {
          console.log('Tentando redirecionar para /todo...');
          this._router.navigate(['/todo']).then(
            (success) => {
              console.log('Redirecionamento bem sucedido:', success);
            },
            (error) => {
              console.error('Erro no redirecionamento:', error);
            }
          );
        }, 1500);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.isSubmited = false;
        this.loading = false;
        this._notification.error(
          err.status === 401
            ? 'Credenciais inválidas'
            : 'Ocorreu um erro ao tentar fazer login'
        );
      },
    });
  }
}
