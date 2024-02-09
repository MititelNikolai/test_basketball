export interface LoginFormInput {
  login: string;
  password: string;
}

export interface LoginFormProps {
  loading: boolean;
  error?: string | null;
  onSubmit: (data: LoginFormInput) => void;
}
