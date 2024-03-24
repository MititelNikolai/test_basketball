export interface PlayerFormInputs {
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
export interface PlayerFormProps {
  edit?: boolean;
  onSubmit: (data: PlayerFormInputs) => void;
  loading?: boolean;
  error?: string;
}

export interface InitialDefaults {
  name?: string;
  number?: number;
  position?: string;
  team?: number;
  birthday?: string;
  height?: number;
  weight?: number;
  file_img?: File;
  avatarUrl?: string;
}

export interface TeamsOptions {
  value: number;
  label: string;
}
export interface PositionsOptions {
  value: string;
  label: string;
}
