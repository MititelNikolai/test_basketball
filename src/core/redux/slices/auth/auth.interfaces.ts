export interface User {
  name: string | null;
  avatarUrl: string | null;
  token: string | null;
}
export interface AuthSlice {
  loading: boolean;
  userInfo: User;
  isAuthenticated: boolean;
  error: any | null;
  success: boolean;
}

export interface RegisterData {
  userName: string;
  login: string;
  password: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface UpdateUserData {
  userName?: string;
  avatarUrl?: string;
}
