export interface InitialState {
  loading: boolean;
  error: any | null;
  success: boolean;
  playerDataFromServer: IDataFromServer;
  currentPlayer?: IPlayerData;
  positionsPlayers?: Array<string>;
}

export interface IDataFromServer {
  data: Array<IPlayerData>;
  count: number | null;
  page: number | null;
  size: number | null;
}
export interface IPlayerData {
  name: string;
  number: number;
  position: string;
  team: number | string;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
}

export interface IPlayerDataToServer {
  id?: number;
  name: string;
  number: number;
  position: string;
  team: number | string;
  birthday: Date | string;
  height: number;
  weight: number;
  avatarUrl: string;
}

export interface IGetPlayersParameters {
  name?: string;
  page?: number;
  pageSize?: number;
}
