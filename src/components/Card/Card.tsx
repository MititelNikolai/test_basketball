import { FC } from "react";
import styles from "./Card.module.css";
import { ICardProps } from "./ICardProps";
import { backendUrl } from "../../core/redux/apiData";
import { Link } from "react-router-dom";
const TeamCard: FC<ICardProps> = ({
  id,
  name,
  type,
  foundationYear,
  imageUrl,
  number,
  team,
  avatarUrl,
}) => {
  const {
    teamCardContainer,
    teamCardImg,
    teamCardImgPlayer,
    cardImg,
    cardImgPlayer,
    teamCardInfo,
    teamName,
    teamYear,
    playerNumber,
  } = styles;
  return (
    <Link to={`${id}`} className={teamCardContainer}>
      <div
        className={
          type === "team" ? teamCardImg : `${teamCardImg} ${teamCardImgPlayer}`
        }
      >
        <img
          className={type === "team" ? cardImg : `${cardImg} ${cardImgPlayer}`}
          src={`${backendUrl}${type === "team" ? imageUrl : avatarUrl}`}
          alt='Card Logo'
        />
      </div>
      <div className={teamCardInfo}>
        <p className={teamName}>
          {name}{" "}
          {type === "player" && (
            <span className={playerNumber}>{`#${number}`}</span>
          )}
        </p>
        <p className={teamYear}>
          {type === "team" ? <>Year of foundation: {foundationYear}</> : team}
        </p>
      </div>
    </Link>
  );
};

export default TeamCard;
