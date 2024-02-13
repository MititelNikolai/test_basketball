import { FC } from "react";
import TeamsActions from "./TeamsActions";
import TeamCard from "../../components/TeamCard/TeamCard";
import styles from "./Teams.module.css";
const Teams: FC = () => {
  const { teamsContainer, cardsContainer } = styles;
  return (
    <>
      <section className={teamsContainer}>
        <TeamsActions />
        <section className={cardsContainer}>
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </section>
      </section>
    </>
  );
};

export default Teams;
