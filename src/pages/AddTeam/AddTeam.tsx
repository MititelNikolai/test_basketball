import { FC, useEffect } from "react";
import styles from "./AddTeam.module.css";
import { useNavigate } from "react-router-dom";

import AddTeamForm from "./components/AddTeamForm";
import { IAddFormInputs } from "./components/IAddFormInputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { addTeam } from "../../core/redux/slices/team/teamActions";
import { resetSuccess } from "../../core/redux/slices/team/teamSlice";
import { IAddTeamData } from "../../core/redux/slices/team/team.types";
import uploadImageToServer from "../../api/imageRequests/uploadImageToServer";

const AddTeam: FC = () => {
  const { addTeamContainer } = styles;

  const { loading, success } = useSelector((state: RootState) => state.team);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("/teams");
    }
  }, [navigate, dispatch, success]);

  const handleSubmit = async (formData: IAddFormInputs) => {
    const { name, division, conference } = formData;
    const dataToServer: IAddTeamData = {
      name,
      foundationYear: parseInt(formData.foundationYear),
      division,
      conference,
      imageUrl: await uploadImageToServer(formData.file_img, userInfo.token),
    };
    dispatch(addTeam(dataToServer) as any);
  };

  return (
    <div className={addTeamContainer}>
      <AddTeamForm onSubmit={(data) => handleSubmit(data)} loading={loading} />
    </div>
  );
};

export default AddTeam;
