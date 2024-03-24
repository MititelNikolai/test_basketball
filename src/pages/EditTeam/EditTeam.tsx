import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentTeam,
  resetTeamError,
  resetTeamSuccess,
  selectTeamStatus,
  setTeamError,
} from "../../core/redux/slices/team/teamSlice";
import { updateTeam } from "../../core/redux/slices/team/teamActions";
import { UpdateTeamData } from "../../core/redux/slices/team/team.interfaces";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import { TeamFormInputs } from "../AddTeam/components/TeamForm.interfaces";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useImageCompression } from "../../hooks/useImageCompression";
import TeamForm from "../AddTeam/components/TeamForm";
import styles from "./EditTeam.module.css";

const EditTeam: FC = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const compress = useImageCompression(210, 210);

  const { loading, success, error } = useSelector(selectTeamStatus);

  const dispatch = useDispatch();
  const dispatchTeam = useTypedDispatch();

  const handleSubmit = async (formData: TeamFormInputs) => {
    const { name, division, conference } = formData;

    const dataToServer: UpdateTeamData = {
      id: Number(teamId),
      name,
      foundationYear: parseInt(formData.foundationYear),
      division,
      conference,
      imageUrl: formData.file_img
        ? await uploadImageToServer(await compress(formData.file_img))
        : formData.imageUrl,
    };
    dataToServer.imageUrl
      ? dispatchTeam(updateTeam(dataToServer))
      : dispatch(setTeamError("Failed to upload Image"));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetTeamError());
      }, 3100);
    }
    if (success) {
      dispatch(resetTeamSuccess());
      dispatch(resetCurrentTeam());
      navigate(`/teams/${teamId}`);
    }
  }, [navigate, dispatch, success, teamId, error]);

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
