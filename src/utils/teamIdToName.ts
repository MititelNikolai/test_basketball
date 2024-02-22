import { IPlayerData } from "../core/redux/slices/player/player.types";
import { ITeamData } from "../core/redux/slices/team/team.types";

export const transformPlayersData = (
  playersData: Array<IPlayerData>,
  teamsData: Array<ITeamData>
) => {
  const teamsMap: Record<number, ITeamData> = teamsData.reduce(
    (map: any, team) => {
      map[team.id] = team;
      return map;
    },
    {}
  );

  const transformedPlayers = playersData.map((player) => {
    const teamId: any = player.team;
    const teamInfo = teamsMap[teamId] || {};
    return {
      ...player,
      team: teamInfo.name || "Unknown Team",
    };
  });
  return transformedPlayers;
};
