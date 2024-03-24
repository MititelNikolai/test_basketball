export interface InitialState {
  loading: boolean;
  error: any | null;
  success: boolean;
  playerDataFromServer: DataFromServer;
  currentPlayer?: SinglePlayerData;
  positionsPlayers?: Array<string>;
  addedPlayerSuccess?: number;
}

export interface DataFromServer {
  data: Array<PlayerData>;
  count: number | null;
  page: number | null;
  size: number | null;
}

export interface PlayerDataToServer {
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

export interface PlayerData {
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

export interface SinglePlayerData {
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

export interface GetPlayersParameters {
  name?: string;
  teamIds?: Array<number>;
  page?: number;
  pageSize?: number;
}
