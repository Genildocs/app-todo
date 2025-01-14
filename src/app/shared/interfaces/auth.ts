export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username?: string;
  message?: string;
}
