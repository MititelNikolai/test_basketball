export interface InitialState {
  loading: boolean;
  error: any | null;
  success: boolean;
  teamDataFromServer: DataFromServer;
  currentTeam?: TeamData;
  addedTeamSuccess?: number;
}
export interface DataFromServer {
  data: Array<TeamData>;
  count: number | null;
  page: number | null;
  size: number | null;
}
export interface TeamData {
  id: number;
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
export interface AddTeamData {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
export interface UpdateTeamData {
  id: number;
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
export interface GetTeamsParameters {
  name?: string;
  page?: number;
  pageSize?: number;
}
