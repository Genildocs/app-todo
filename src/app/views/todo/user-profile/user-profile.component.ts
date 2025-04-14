import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';

interface UserSettings {
  emailNotifications: boolean;
  darkMode: boolean;
  language: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [`
    /* Estilos personalizados para os switches */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: #2196F3;
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }
  `]
})
export class UserProfileComponent implements OnInit {
  userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    registrationDate: '01/01/2024'
  };

  settings: UserSettings = {
    emailNotifications: true,
    darkMode: false,
    language: 'Português'
  };

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    // TODO: Implementar carregamento dos dados do usuário
    console.log('Carregando dados do usuário...');
  }

  onEditProfile(): void {
    this.notificationService.info('Funcionalidade de edição em desenvolvimento');
  }

  onToggleEmailNotifications(): void {
    this.settings.emailNotifications = !this.settings.emailNotifications;
    this.notificationService.success(
      `Notificações por email ${this.settings.emailNotifications ? 'ativadas' : 'desativadas'}`
    );
  }

  onToggleDarkMode(): void {
    this.settings.darkMode = !this.settings.darkMode;
    this.notificationService.success(
      `Modo escuro ${this.settings.darkMode ? 'ativado' : 'desativado'}`
    );
  }

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.settings.language = select.value;
    this.notificationService.success(`Idioma alterado para ${select.value}`);
  }

  onChangePassword(): void {
    this.notificationService.info('Funcionalidade de alteração de senha em desenvolvimento');
  }

  onConfigure2FA(): void {
    this.notificationService.info('Funcionalidade de 2FA em desenvolvimento');
  }
}
