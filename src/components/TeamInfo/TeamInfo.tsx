import { FC } from "react";
import { ITeamInfoProps } from "./ITeamInfoProps";
import styles from "./TeamInfo.module.css";
import { backendUrl } from "../../core/redux/apiData";
const TeamInfo: FC<ITeamInfoProps> = ({
  name,
  foundationYear,
  conference,
  division,
  imageUrl,
}) => {
  const {
    teamInfoContainer,
    teamInfoImageContainer,
    teamInfoDescriptionContainer,
    teamInfoName,
    descriptionGrid,
    descriptionContainer,
    descriptionKey,
    descriptionValue,
  } = styles;
  return (
    <div className={teamInfoContainer}>
      <div className={teamInfoImageContainer}>
        <img src={`${backendUrl}${imageUrl}`} alt='Team Logo' />
      </div>
      <div className={teamInfoDescriptionContainer}>
        <p className={teamInfoName}>{name}</p>
        <div className={descriptionGrid}>
          <div className={descriptionContainer}>
            <p className={descriptionKey}>Year of Foundation</p>
            <p className={descriptionValue}>{foundationYear}</p>
          </div>
          <div className={descriptionContainer}>
            <p className={descriptionKey}>Division</p>
            <p className={descriptionValue}>{division}</p>
          </div>
          <div className={descriptionContainer}>
            <p className={descriptionKey}>Conference</p>
            <p className={descriptionValue}>{conference}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
