import { FC } from "react";
import { useSelector } from "react-redux";

import { selectTeam } from "../../core/redux/slices/team/teamSlice";

import styles from "./SingleTeam.module.css";
import TeamInfo from "../../components/TeamInfo/TeamInfo";
const SingleTeam: FC = () => {
  const { singleTeamContainer } = styles;

  const team = useSelector(selectTeam);

  return (
    <>
      {team && (
        <section className={singleTeamContainer}>
          <TeamInfo {...team} />
        </section>
      )}
    </>
  );
};

export default SingleTeam;
