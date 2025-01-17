export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username?: string;
  message?: string;
}

export interface RegisterUser {
  email: string;
  name: string;
  password: string;
}
