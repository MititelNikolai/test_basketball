import { FC } from "react";
import AddTeamForm from "../AddTeam/components/AddTeamForm";
import styles from "./EditTeam.module.css";
import { useSelector } from "react-redux";
import { selectTeam } from "../../core/redux/slices/team/teamSlice";
const EditTeam: FC = () => {
  const { editTeamContainer } = styles;
  const team = useSelector(selectTeam);
  return (
    <>
      {team && (
        <div className={editTeamContainer}>
          <AddTeamForm onSubmit={() => {}} />
        </div>
      )}
    </>
  );
};

export default EditTeam;
