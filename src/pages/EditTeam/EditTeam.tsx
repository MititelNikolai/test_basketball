import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentTeam,
  resetTeamSuccess,
  selectTeamStatus,
} from "../../core/redux/slices/team/teamSlice";
import { updateTeam } from "../../core/redux/slices/team/teamActions";
import { IUpdateTeamData } from "../../core/redux/slices/team/team.interfaces";
import { selectCurrentUser } from "../../core/redux/slices/auth/authSlice";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import { ITeamFormInputs } from "../AddTeam/components/TeamForm.interfaces";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import TeamForm from "../AddTeam/components/TeamForm";
import styles from "./EditTeam.module.css";

const EditTeam: FC = () => {
  const { teamId } = useParams();
  const { loading, success, error } = useSelector(selectTeamStatus);

  const userInfo = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchTeam = useTypedDispatch();

  const handleSubmit = async (formData: ITeamFormInputs) => {
    const { name, division, conference } = formData;
    const dataToServer: IUpdateTeamData = {
      id: Number(teamId),
      name,
      foundationYear: parseInt(formData.foundationYear),
      division,
      conference,
      imageUrl: formData.file_img
        ? await uploadImageToServer(formData.file_img, userInfo.token)
        : formData.imageUrl,
    };
    dispatchTeam(updateTeam(dataToServer));
  };
  useEffect(() => {
    if (success) {
      dispatch(resetTeamSuccess());
      dispatch(resetCurrentTeam());
      navigate(`/teams/${teamId}`);
    }
  }, [navigate, dispatch, success, teamId]);

  return (
    <>
      {teamId && (
        <div className={styles.editTeamContainer}>
          <TeamForm
            loading={loading}
            error={error}
            edit
            onSubmit={(data) => {
              handleSubmit(data);
            }}
          />
        </div>
      )}
    </>
  );
};

export default EditTeam;
