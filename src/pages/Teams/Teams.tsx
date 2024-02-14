import { FC, useEffect } from "react";
import TeamsActions from "./TeamsActions";
import TeamCard from "../../components/TeamCard/TeamCard";
import styles from "./Teams.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../core/redux/slices/team/teamActions";
import {
  clearTeamItems,
  selectTeams,
} from "../../core/redux/slices/team/teamSlice";
import { Outlet, useLocation } from "react-router-dom";

const Teams: FC = () => {
  const { teamsContainer, cardsContainer } = styles;
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const location = useLocation();
  useEffect(() => {
    location.pathname === "/teams" && dispatch(getTeams({}) as any);
    return () => {
      dispatch(clearTeamItems());
    };
  }, [dispatch, location.pathname]);
  return (
    <>
      {location.pathname === "/teams" ? (
        <section className={teamsContainer}>
          <TeamsActions />
          <section className={cardsContainer}>
            {teams && Array.isArray(teams) && teams.length !== 0
              ? teams.map((team) => {
                  return <TeamCard {...team} key={team.id} />;
                })
              : null}
          </section>
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Teams;
