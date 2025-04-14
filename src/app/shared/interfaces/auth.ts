export interface User {
  email: string;
  password: string;
  username: string;
  id: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User[];
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

export type TUrlApi = string;
