export interface IAddFormInputs {
  name: string;
  foundationYear: string;
  division: string;
  conference: string;
  file_img?: File;
  imageUrl: string;
}

export interface AddTeamFormProps {
  loading?: boolean;
  onSubmit: (data: IAddFormInputs) => void;
}
