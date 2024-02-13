export interface IAddFormInputs {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  file_img: File;
}

interface IAddTeamDataToServer {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  imageUrl: string;
}

export interface AddTeamFormProps {
  loading?: boolean;
  onSubmit: (data: IAddFormInputs) => void;
}
