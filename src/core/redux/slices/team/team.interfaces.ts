export interface InitialState {
  loading: boolean;
  error: any | null;
  success: boolean;
  teamDataFromServer: IDataFromServer;
  currentTeam?: ITeamData;
  addedTeamSuccess?: number;
}
export interface IDataFromServer {
  data: Array<ITeamData>;
  count: number | null;
  page: number | null;
  size: number | null;
}
export interface ITeamData {
  id: number;
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
export interface IAddTeamData {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
export interface IUpdateTeamData {
  id: number;
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
export interface IGetTeamsParameters {
  name?: string;
  page?: number;
  pageSize?: number;
}
