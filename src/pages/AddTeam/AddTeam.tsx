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
} from "../../core/redux/slices/team/teamSlice";
import { selectCurrentUser } from "../../core/redux/slices/auth/authSlice";
import { IAddTeamData } from "../../core/redux/slices/team/team.interfaces";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import TeamForm from "./components/TeamForm";
import { ITeamFormInputs } from "./components/TeamForm.interfaces";
import styles from "./AddTeam.module.css";

const AddTeam: FC = () => {
  const { addTeamContainer } = styles;

  const { loading, addedTeamSuccess, error } = useSelector(selectTeamStatus);

  const userInfo = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchTeam: ThunkDispatch<RootState, void, AllTeamActions> =
    useDispatch();
  dispatch(resetCurrentTeam());
  useEffect(() => {
    if (addedTeamSuccess) {
      navigate(`/teams/${addedTeamSuccess}`);
      dispatch(resetAddedTeamSuccess());
    }
  }, [navigate, dispatch, addedTeamSuccess]);

  const handleSubmit = async (formData: ITeamFormInputs) => {
    const { name, division, conference } = formData;
    const dataToServer: IAddTeamData = {
      name: name.trim(),
      foundationYear: parseInt(formData.foundationYear),
      division: division.trim(),
      conference: conference.trim(),
      imageUrl:
        formData.file_img &&
        (await uploadImageToServer(formData.file_img, userInfo.token)),
    };
    dispatchTeam(addTeam(dataToServer));
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
