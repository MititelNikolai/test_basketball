import { FC, useEffect } from "react";
import styles from "./AddTeam.module.css";
import { useNavigate } from "react-router-dom";
import TeamForm from "./components/TeamForm";
import { ITeamFormInputs } from "./components/ITeamFormInputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import {
  AllTeamActions,
  addTeam,
} from "../../core/redux/slices/team/teamActions";
import {
  clearCurrentTeam,
  resetAddedTeamSuccess,
} from "../../core/redux/slices/team/teamSlice";
import { IAddTeamData } from "../../core/redux/slices/team/team.types";
import uploadImageToServer from "../../api/imageRequests/uploadImageToServer";
import { ThunkDispatch } from "@reduxjs/toolkit";
const AddTeam: FC = () => {
  const { addTeamContainer } = styles;
  const { loading, addedTeamSuccess, error } = useSelector(
    (state: RootState) => state.team
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchTeam: ThunkDispatch<RootState, void, AllTeamActions> =
    useDispatch();
  dispatch(clearCurrentTeam());
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
