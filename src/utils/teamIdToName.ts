import { PlayerData } from "../core/redux/slices/player/player.interfaces";
import { TeamData } from "../core/redux/slices/team/team.interfaces";

export const transformPlayersData = (
  playersData: Array<PlayerData>,
  teamsData: Array<TeamData>
) => {
  const teamsMap: Record<number, TeamData> = teamsData.reduce(
    (map: Record<number, TeamData>, team) => {
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
