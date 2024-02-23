import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTeam } from "../../core/redux/slices/team/teamSlice";

import styles from "./SingleTeam.module.css";
import TeamInfo from "../../components/TeamInfo/TeamInfo";
import { getPlayers } from "../../core/redux/slices/player/playerAction";
import { useParams } from "react-router-dom";
import { selectPlayers } from "../../core/redux/slices/player/playerSlice";
import { backendUrl } from "../../core/redux/apiData";
import { calculateAge } from "../../utils/calculateAge";
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
  } = styles;
  const team = useSelector(selectTeam);
  const players = useSelector(selectPlayers);

  const { teamId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPlayers({ teamIds: [Number(teamId)] && [Number(teamId)] }) as any
    );
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
                  <td
                    style={{
                      width: "5%",
                      paddingLeft: "2rem",
                      textAlign: "left",
                    }}
                  >
                    #
                  </td>
                  <td style={{ width: "70%", textAlign: "left" }}>Player</td>
                  <td style={{ width: "12%" }}>Height</td>
                  <td style={{ width: "10%" }}>Weight</td>
                  <td style={{ width: "4%", paddingRight: "2rem" }}>Age</td>
                </tr>
                {players && players.length !== 0 ? (
                  <>
                    {players.map((player) => {
                      return (
                        <tr className={teamInfoTableInner} key={player.id}>
                          <td
                            style={{
                              width: "5%",
                              paddingLeft: "2rem",
                              textAlign: "left",
                            }}
                          >
                            {player.number}
                          </td>
                          <td style={{ width: "70%", textAlign: "left" }}>
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
                            style={{ width: "12%" }}
                          >{`${player.height} cm`}</td>
                          <td
                            style={{ width: "10%" }}
                          >{`${player.weight} kg`}</td>
                          <td style={{ width: "4%", paddingRight: "2rem" }}>
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
