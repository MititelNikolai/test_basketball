import { FC, useEffect, useState } from "react";
import TeamsActions from "./TeamsActions";
import TeamCard from "../../components/TeamCard/TeamCard";
import styles from "./Teams.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../core/redux/slices/team/teamActions";
import { selectTeams } from "../../core/redux/slices/team/teamSlice";
import { Outlet, useLocation } from "react-router-dom";
import { ITeamData } from "../../core/redux/slices/team/team.types";
const Teams: FC = () => {
  const { teamsContainer, cardsContainer } = styles;
  const [filtered, setFiltered] = useState<Array<ITeamData>>();
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const location = useLocation();
  const handleFilter = (search: string) => {
    setFiltered(
      teams.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  useEffect(() => {
    location.pathname === "/teams" && dispatch(getTeams({}) as any);
    return () => {
      setFiltered(undefined);
    };
  }, [dispatch, location.pathname]);

  return (
    <>
      {location.pathname === "/teams" ? (
        <section className={teamsContainer}>
          <TeamsActions
            filter={(search) => {
              handleFilter(search);
            }}
          />
          <section className={cardsContainer}>
            {filtered ? (
              <>
                {filtered && Array.isArray(filtered) && filtered.length !== 0
                  ? filtered.map((teams) => {
                      return <TeamCard {...teams} key={teams.id} />;
                    })
                  : null}
              </>
            ) : (
              <>
                {teams && Array.isArray(teams) && teams.length !== 0
                  ? teams.map((teams) => {
                      return <TeamCard {...teams} key={teams.id} />;
                    })
                  : null}
              </>
            )}
          </section>
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Teams;
