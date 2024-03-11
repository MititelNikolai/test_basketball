export interface IPlayerFormInputs {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: Date | string;
  height: number;
  weight: number;
  file_img?: File;
  avatarUrl?: string;
}
export interface IPlayerFormProps {
  edit?: boolean;
  onSubmit: (data: IPlayerFormInputs) => void;
  loading?: boolean;
  error?: string;
}

export interface InitialDefaults {
  name: string | undefined;
  number: number | undefined;
  position: string | undefined;
  team: number | undefined;
  birthday: string | undefined;
  height: number | undefined;
  weight: number | undefined;
  file_img?: File | undefined;
  avatarUrl?: string | undefined;
}

export interface ITeamsOptions {
  value: number;
  label: string;
}
export interface IPositionsOptions {
  value: string;
  label: string;
}
