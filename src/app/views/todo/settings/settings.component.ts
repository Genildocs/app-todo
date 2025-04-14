import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';

interface UserInfo {
  name: string;
  email: string;
  role: string;
  lastAccess: string;
}

interface SystemSettings {
  maintenanceMode: boolean;
  loggingEnabled: boolean;
  logLevel: string;
}

interface User {
  name: string;
  currentRole: string;
  newRole?: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
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
export class SettingsComponent implements OnInit {
  userInfo: UserInfo = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrador',
    lastAccess: '01/01/2024 12:00'
  };

  systemSettings: SystemSettings = {
    maintenanceMode: false,
    loggingEnabled: true,
    logLevel: 'Info'
  };

  users: User[] = [
    { name: 'John Doe', currentRole: 'User' },
    { name: 'Jane Smith', currentRole: 'Moderator' },
    { name: 'Bob Johnson', currentRole: 'User' }
  ];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    // TODO: Implementar carregamento das configurações do sistema
    console.log('Carregando configurações do sistema...');
  }

  onToggleMaintenanceMode(): void {
    this.systemSettings.maintenanceMode = !this.systemSettings.maintenanceMode;
    this.notificationService.success(
      `Modo de manutenção ${this.systemSettings.maintenanceMode ? 'ativado' : 'desativado'}`
    );
  }

  onToggleLogging(): void {
    this.systemSettings.loggingEnabled = !this.systemSettings.loggingEnabled;
    this.notificationService.success(
      `Registro de logs ${this.systemSettings.loggingEnabled ? 'ativado' : 'desativado'}`
    );
  }

  onConfigureBackup(): void {
    this.notificationService.info('Funcionalidade de backup em desenvolvimento');
  }

  onLogLevelChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.systemSettings.logLevel = select.value;
    this.notificationService.success(`Nível de log alterado para ${select.value}`);
  }

  onViewLogs(): void {
    this.notificationService.info('Funcionalidade de visualização de logs em desenvolvimento');
  }

  onRoleChange(event: Event, user: User): void {
    const select = event.target as HTMLSelectElement;
    user.newRole = select.value;
  }

  onSaveRole(user: User): void {
    if (user.newRole && user.newRole !== user.currentRole) {
      user.currentRole = user.newRole;
      this.notificationService.success(`Role de ${user.name} alterada para ${user.newRole}`);
    }
  }
}
