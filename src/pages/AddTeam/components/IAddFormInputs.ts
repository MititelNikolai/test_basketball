export interface IAddFormInputs {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  file_img?: File;
  imageUrl?: string;
}
export interface InitialDefaults {
  name: string | undefined;
  foundationYear: string | undefined;
  division: string | undefined;
  conference: string | undefined;
  file_img?: File | undefined;
  imageUrl?: string | undefined;
}

export interface AddTeamFormProps {
  loading?: boolean;
  onSubmit: (data: IAddFormInputs) => void;
  edit?: boolean;
}

export interface IAddTeamDataToServer {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  imageUrl: string;
}
