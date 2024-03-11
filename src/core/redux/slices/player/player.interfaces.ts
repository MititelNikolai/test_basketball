export interface InitialState {
  loading: boolean;
  error: any | null;
  success: boolean;
  playerDataFromServer: IDataFromServer;
  currentPlayer?: ISinglePlayerData;
  positionsPlayers?: Array<string>;
  addedPlayerSuccess?: number;
}

export interface IDataFromServer {
  data: Array<IPlayerData>;
  count: number | null;
  page: number | null;
  size: number | null;
}

export interface IPlayerDataToServer {
  id?: number;
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: Date | string;
  height: number;
  weight: number;
  avatarUrl: string;
}

export interface IPlayerData {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
}

export interface ISinglePlayerData {
  name: string;
  number: number;
  position: string;
  team: number;
  teamName: string;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
}

export interface IGetPlayersParameters {
  name?: string;
  teamIds?: Array<number>;
  page?: number;
  pageSize?: number;
}
