import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetError, selectTeam } from "../../core/redux/slices/team/teamSlice";

import styles from "./SingleTeam.module.css";
import TeamInfo from "../../components/TeamInfo/TeamInfo";
import { getPlayers } from "../../core/redux/slices/player/playerAction";
import { useParams } from "react-router-dom";
import { selectPlayers } from "../../core/redux/slices/player/playerSlice";
import { backendUrl } from "../../core/redux/apiData";
import { calculateAge } from "../../utils/calculateAge";
import { RootState } from "../../core/redux/store";
const SingleTeam: FC = () => {
  const {
    singleTeamContainer,
    teamInfoTable,
    teamInfoTableInner,
    singleTeamTable,
    tableHeader,
    teamTableBody,
    playerDescription,
    playerAvatar,
    playerInfo,
    playerName,
    playerPosition,
    firstColumn,
    secondColumn,
    thirdColumn,
    fourthColumn,
    fifthColumn,
    warning,
  } = styles;
  const team = useSelector(selectTeam);
  const players = useSelector(selectPlayers);
  const { error } = useSelector((state: RootState) => state.team);
  const { teamId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPlayers({ teamIds: [Number(teamId)] && [Number(teamId)] }) as any
    );
    setTimeout(() => {
      dispatch(resetError());
    }, 5000);
  }, [dispatch, teamId]);
  return (
    <>
      {team && (
        <section className={singleTeamContainer}>
          <TeamInfo {...team} />
          <div className={singleTeamTable}>
            <table className={teamInfoTable}>
              <tbody className={teamTableBody}>
                <tr>
                  <td className={tableHeader}>Roster</td>
                </tr>
                <tr className={teamInfoTableInner}>
                  <td className={firstColumn}>#</td>
                  <td className={secondColumn}>Player</td>
                  <td className={thirdColumn}>Height</td>
                  <td className={fourthColumn}>Weight</td>
                  <td className={fifthColumn}>Age</td>
                </tr>
                {players && players.length !== 0 ? (
                  <>
                    {players.map((player) => {
                      return (
                        <tr className={teamInfoTableInner} key={player.id}>
                          <td
                            className={
                              error ? `${firstColumn} ${warning}` : firstColumn
                            }
                          >
                            {player.number}
                          </td>
                          <td
                            className={
                              error
                                ? `${secondColumn} ${warning}`
                                : secondColumn
                            }
                          >
                            <div className={playerInfo}>
                              <img
                                className={playerAvatar}
                                src={`${backendUrl}${player.avatarUrl}`}
                                alt='Player Avatar'
                              />
                              <div className={playerDescription}>
                                <p className={playerName}>{player.name}</p>
                                <p className={playerPosition}>
                                  {player.position}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td
                            className={
                              error ? `${thirdColumn} ${warning}` : thirdColumn
                            }
                          >{`${player.height} cm`}</td>
                          <td
                            className={
                              error
                                ? `${fourthColumn} ${warning}`
                                : fourthColumn
                            }
                          >{`${player.weight} kg`}</td>
                          <td
                            className={
                              error ? `${fifthColumn} ${warning}` : fifthColumn
                            }
                          >
                            {calculateAge(player.birthday)}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleTeam;
