import { SelectOptions } from "./components/PlayerMultiSelect/PlayerMultiSelect.interfaces";

export interface DisplayData {
  team: string;
  name: string;
  number: number;
  position: string;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
}
export interface ITeamActions {
  filterName: (search: string) => void;
  filterTeams: (selected: Array<SelectOptions>) => void;
  resetAction: () => void;
  inSearch: boolean;
  searchTeam: Array<SelectOptions> | undefined;
}
