export interface IRegisterFormInput {
  userName: string;
  login: string;
  password: string;
  confirmPassword?: string;
  agreement?: boolean;
}

export interface IRegisterFormProps {
  loading: boolean;
  onSubmit: (data: IRegisterFormInput) => void;
  error?: string;
}
