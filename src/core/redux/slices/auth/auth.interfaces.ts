export interface IUser {
  name: string | null;
  avatarUrl: string | null;
  token: string | null;
}
export interface IAuthSlice {
  loading: boolean;
  userInfo: IUser;
  isAuthenticated: boolean;
  error: any | null;
  success: boolean;
}

export interface IRegisterData {
  userName: string;
  login: string;
  password: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface IUpdateUserData {
  userName?: string;
  avatarUrl?: string;
}
