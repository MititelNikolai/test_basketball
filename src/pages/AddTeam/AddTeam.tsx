import { FC, useEffect } from "react";
import styles from "./AddTeam.module.css";
import { useNavigate } from "react-router-dom";

import TeamForm from "./components/TeamForm";
import { ITeamFormInputs } from "./components/ITeamFormInputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { addTeam } from "../../core/redux/slices/team/teamActions";
import {
  clearCurrentTeam,
  resetSuccess,
} from "../../core/redux/slices/team/teamSlice";
import { IAddTeamData } from "../../core/redux/slices/team/team.types";
import uploadImageToServer from "../../api/imageRequests/uploadImageToServer";

const AddTeam: FC = () => {
  const { addTeamContainer } = styles;

  const { loading, success } = useSelector((state: RootState) => state.team);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(clearCurrentTeam());
  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("/teams");
    }
  }, [navigate, dispatch, success]);

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
    dispatch(addTeam(dataToServer) as any);
  };

  return (
    <div className={addTeamContainer}>
      <TeamForm onSubmit={(data) => handleSubmit(data)} loading={loading} />
    </div>
  );
};

export default AddTeam;
