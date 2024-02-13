import { FC } from "react";
import testTeamImg from "../../assets/img/testTeam.png";
import styles from "./TeamCard.module.css";
const TeamCard: FC = () => {
  const { teamCardContainer, teamCardImg, teamCardInfo, teamName, teamYear } =
    styles;
  return (
    <div className={teamCardContainer}>
      <div className={teamCardImg}>
        <img src={testTeamImg} alt='Test' />
      </div>
      <div className={teamCardInfo}>
        <p className={teamName}>Portland trail blazers</p>
        <p className={teamYear}>Year of foundation: 1970</p>
      </div>
    </div>
  );
};

export default TeamCard;
