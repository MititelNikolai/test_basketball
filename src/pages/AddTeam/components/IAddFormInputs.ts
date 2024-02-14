export interface IAddFormInputs {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  file_img: File;
}

export interface AddTeamFormProps {
  loading?: boolean;
  onSubmit: (data: IAddFormInputs) => void;
}

export interface IAddTeamDataToServer {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  imageUrl: string;
}
