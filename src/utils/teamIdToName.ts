import { IPlayerData } from "../core/redux/slices/player/player.interfaces";
import { ITeamData } from "../core/redux/slices/team/team.interfaces";

export const transformPlayersData = (
  playersData: Array<IPlayerData>,
  teamsData: Array<ITeamData>
) => {
  const teamsMap: Record<number, ITeamData> = teamsData.reduce(
    (map: Record<number, ITeamData>, team) => {
      map[team.id] = team;
      return map;
    },
    {}
  );

  const transformedPlayers = playersData.map((player) => {
    const teamId: number = player.team;
    const teamInfo = teamsMap[teamId] || {};
    return {
      ...player,
      team: teamInfo.name || "Unknown Team",
    };
  });
  return transformedPlayers;
};
