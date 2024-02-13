export interface InitialState {
  loading: boolean;
  error: any | null;
  success: boolean;
}

export interface IAddTeamData {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
