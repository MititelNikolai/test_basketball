export interface RegisterFormInput {
  userName: string;
  login: string;
  password: string;
  confirmPassword?: string;
  agreement?: boolean;
}

export interface RegisterFormProps {
  loading: boolean;
  onSubmit: (data: RegisterFormInput) => void;
}
