import { FC } from "react";
import styles from "./PlayerInfo.module.css";
import { IPlayerInfoProps } from "./IPlayerInfoProps";
import { backendUrl } from "../../core/redux/apiData";
import { calculateAge } from "../../utils/calculateAge";
const PlayerInfo: FC<IPlayerInfoProps> = ({
  id,
  name,
  number,
  position,
  teamName,
  birthday,
  height,
  weight,
  avatarUrl,
}) => {
  const {
    playerInfoContainer,
    playerInfoImageContainer,
    playerInfoDescriptionContainer,
    playerInfoName,
    playerInfoNumber,
    descriptionGrid,
    descriptionContainer,
    descriptionKey,
    descriptionValue,
  } = styles;
  return (
    <div className={playerInfoContainer}>
      <div className={playerInfoImageContainer}>
        <img src={`${backendUrl}${avatarUrl}`} alt='Team Logo' />
      </div>
      <div className={playerInfoDescriptionContainer}>
        <p className={playerInfoName}>
          {name}
          <span className={playerInfoNumber}>{` #${number}`}</span>
        </p>
        <div className={descriptionGrid}>
          <div className={descriptionContainer}>
            <p className={descriptionKey}>Position</p>
            <p className={descriptionValue}>{position}</p>
          </div>

          <div className={descriptionContainer}>
            <p className={descriptionKey}>Team</p>
            <p className={descriptionValue}>{teamName}</p>
          </div>
          <div className={descriptionContainer}>
            <p className={descriptionKey}>Height</p>
            <p className={descriptionValue}>{height}</p>
          </div>
          <div className={descriptionContainer}>
            <p className={descriptionKey}>Weight</p>
            <p className={descriptionValue}>{weight}</p>
          </div>
          <div className={descriptionContainer}>
            <p className={descriptionKey}>Age</p>
            <p className={descriptionValue}>{calculateAge(birthday)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
