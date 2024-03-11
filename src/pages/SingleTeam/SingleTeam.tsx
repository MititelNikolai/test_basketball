import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTeamError,
  selectTeam,
  selectTeamStatus,
} from "../../core/redux/slices/team/teamSlice";
import { getPlayers } from "../../core/redux/slices/player/playerAction";
import { selectPlayers } from "../../core/redux/slices/player/playerSlice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { calculateAge } from "../../utils/calculateAge";
import { TeamInfo } from "../../components";
import styles from "./SingleTeam.module.css";

const SingleTeam: FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const team = useSelector(selectTeam);
  const players = useSelector(selectPlayers);
  const { error } = useSelector(selectTeamStatus);
  const { teamId } = useParams();

  const dispatchPlayers = useTypedDispatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatchPlayers(
      getPlayers({ teamIds: [Number(teamId)] && [Number(teamId)] })
    );
    setTimeout(() => {
      dispatch(resetTeamError());
    }, 5000);
  }, [dispatch, teamId, dispatchPlayers]);

  return (
    <>
      {team && (
        <section className={styles.singleTeamContainer}>
          <TeamInfo {...team} />
          <div className={styles.singleTeamTable}>
            <table className={styles.teamInfoTable}>
              <tbody className={styles.teamTableBody}>
                <tr>
                  <td className={styles.tableHeader}>Roster</td>
                </tr>
                <tr className={styles.teamInfoTableInner}>
                  <td className={styles.firstColumn}>#</td>
                  <td className={styles.secondColumn}>Player</td>
                  <td className={styles.thirdColumn}>Height</td>
                  <td className={styles.fourthColumn}>Weight</td>
                  <td className={styles.fifthColumn}>Age</td>
                </tr>
                {players && players.length !== 0 ? (
                  <>
                    {players.map((player) => {
                      return (
                        <tr
                          className={styles.teamInfoTableInner}
                          key={player.id}
                        >
                          <td
                            className={
                              error
                                ? `${styles.firstColumn} ${styles.warning}`
                                : styles.firstColumn
                            }
                          >
                            {player.number}
                          </td>
                          <td
                            className={
                              error
                                ? `${styles.secondColumn} ${styles.warning}`
                                : styles.secondColumn
                            }
                          >
                            <div className={styles.playerInfo}>
                              <img
                                className={styles.playerAvatar}
                                src={`${backendUrl}${player.avatarUrl}`}
                                alt='Player Avatar'
                              />
                              <div className={styles.playerDescription}>
                                <p className={styles.playerName}>
                                  {player.name}
                                </p>
                                <p className={styles.playerPosition}>
                                  {player.position}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td
                            className={
                              error
                                ? `${styles.thirdColumn} ${styles.warning}`
                                : styles.thirdColumn
                            }
                          >{`${player.height} cm`}</td>
                          <td
                            className={
                              error
                                ? `${styles.fourthColumn} ${styles.warning}`
                                : styles.fourthColumn
                            }
                          >{`${player.weight} kg`}</td>
                          <td
                            className={
                              error
                                ? `${styles.fifthColumn} ${styles.warning}`
                                : styles.fifthColumn
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
