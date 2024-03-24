export interface TeamFormInputs {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  file_img?: File;
  imageUrl?: string;
}
export interface InitialDefaults {
  name?: string;
  foundationYear?: string;
  division?: string;
  conference?: string;
  file_img?: File;
  imageUrl?: string;
}

export interface TeamFormProps {
  loading?: boolean;
  onSubmit: (data: TeamFormInputs) => void;
  edit?: boolean;
  error?: string;
}

export interface AddTeamDataToServer {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  imageUrl: string;
}
