import { FC } from "react";
import styles from "./TeamCard.module.css";
import { ITeamCardProps } from "./ITeamCardProps";
import { backendUrl } from "../../core/redux/apiData";
import { Link } from "react-router-dom";
const TeamCard: FC<ITeamCardProps> = ({
  id,
  name,
  foundationYear,
  division,
  conference,
  imageUrl,
}) => {
  const { teamCardContainer, teamCardImg, teamCardInfo, teamName, teamYear } =
    styles;
  return (
    <Link to={`${id}`}>
      <div className={teamCardContainer}>
        <div className={teamCardImg}>
          <img src={`${backendUrl}${imageUrl}`} alt='Team Logo' />
        </div>
        <div className={teamCardInfo}>
          <p className={teamName}>{name}</p>
          <p className={teamYear}>Year of foundation: {foundationYear}</p>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
