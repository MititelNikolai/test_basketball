import { FC } from "react";
import { Link } from "react-router-dom";
import CardProps from "./CardProps";
import styles from "./Card.module.css";

const Card: FC<CardProps> = ({
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
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
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

export default Card;
