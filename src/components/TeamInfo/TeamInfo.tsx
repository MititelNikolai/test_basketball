import { FC } from "react";
import TeamInfoProps from "./TeamInfoProps";
import styles from "./TeamInfo.module.css";

const TeamInfo: FC<TeamInfoProps> = ({
  name,
  foundationYear,
  conference,
  division,
  imageUrl,
}) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  return (
    <div className={styles.teamInfoContainer}>
      <div className={styles.teamInfoImageContainer}>
        <img src={`${backendUrl}${imageUrl}`} alt='Team Logo' />
      </div>
      <div className={styles.teamInfoDescriptionContainer}>
        <p className={styles.teamInfoName}>{name}</p>
        <div className={styles.descriptionGrid}>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionKey}>Year of Foundation</p>
            <p className={styles.descriptionValue}>{foundationYear}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionKey}>Division</p>
            <p className={styles.descriptionValue}>{division}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionKey}>Conference</p>
            <p className={styles.descriptionValue}>{conference}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
