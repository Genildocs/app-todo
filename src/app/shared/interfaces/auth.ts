export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

export type TUrlApi = string;
