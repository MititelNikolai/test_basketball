import { FC } from "react";
import { calculateAge } from "../../utils/calculateAge";
import { addSpaceBeforeUppercase } from "../../utils/stringFunctions";
import { PlayerInfoProps } from "./PlayerInfoProps";
import styles from "./PlayerInfo.module.css";

const PlayerInfo: FC<PlayerInfoProps> = ({
  name,
  number,
  position,
  teamName,
  birthday,
  height,
  weight,
  avatarUrl,
}) => {
  return (
    <div className={styles.playerInfoContainer}>
      <div className={styles.playerInfoImageContainer}>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${avatarUrl}`}
          alt='Team Logo'
        />
      </div>
      <div className={styles.playerInfoDescriptionContainer}>
        <p className={styles.playerInfoName}>
          {name}
          <span className={styles.playerInfoNumber}>{` #${number}`}</span>
        </p>
        <div className={styles.descriptionGrid}>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionKey}>Position</p>
            <p className={styles.descriptionValue}>
              {addSpaceBeforeUppercase(position)}
            </p>
          </div>

          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionKey}>Team</p>
            <p className={styles.descriptionValue}>{teamName}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionKey}>Height</p>
            <p className={styles.descriptionValue}>{height}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionKey}>Weight</p>
            <p className={styles.descriptionValue}>{weight}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionKey}>Age</p>
            <p className={styles.descriptionValue}>{calculateAge(birthday)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
