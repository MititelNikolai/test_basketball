import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../core/redux/store";
import {
  AllTeamActions,
  addTeam,
} from "../../core/redux/slices/team/teamActions";
import {
  resetCurrentTeam,
  resetAddedTeamSuccess,
  selectTeamStatus,
  setTeamError,
  resetTeamError,
} from "../../core/redux/slices/team/teamSlice";
import { AddTeamData } from "../../core/redux/slices/team/team.interfaces";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import { useImageCompression } from "../../hooks/useImageCompression";
import TeamForm from "./components/TeamForm";
import { TeamFormInputs } from "./components/TeamForm.interfaces";
import styles from "./AddTeam.module.css";

const AddTeam: FC = () => {
  const { addTeamContainer } = styles;
  const navigate = useNavigate();
  const compress = useImageCompression(210, 210);

  const { loading, addedTeamSuccess, error } = useSelector(selectTeamStatus);

  const dispatch = useDispatch();
  const dispatchTeam: ThunkDispatch<RootState, void, AllTeamActions> =
    useDispatch();

  dispatch(resetCurrentTeam());

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetTeamError());
      }, 3100);
    }
    if (addedTeamSuccess) {
      navigate(`/teams/${addedTeamSuccess}`);
      dispatch(resetAddedTeamSuccess());
    }
  }, [navigate, dispatch, addedTeamSuccess, error]);

  const handleSubmit = async (formData: TeamFormInputs) => {
    const { name, division, conference } = formData;
    const dataToServer: AddTeamData = {
      name: name.trim(),
      foundationYear: parseInt(formData.foundationYear),
      division: division.trim(),
      conference: conference.trim(),
      imageUrl:
        formData.file_img &&
        (await uploadImageToServer(await compress(formData.file_img))),
    };
    dataToServer.imageUrl
      ? dispatchTeam(addTeam(dataToServer))
      : dispatch(setTeamError("Failed to upload Image"));
  };

  return (
    <div className={addTeamContainer}>
      <TeamForm
        onSubmit={(data) => handleSubmit(data)}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AddTeam;
