import { FC, useEffect } from "react";
import TeamForm from "../AddTeam/components/TeamForm";
import styles from "./EditTeam.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccess } from "../../core/redux/slices/team/teamSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../core/redux/store";
import { IUpdateTeamData } from "../../core/redux/slices/team/team.types";
import uploadImageToServer from "../../api/imageRequests/uploadImageToServer";
import { ITeamFormInputs } from "../AddTeam/components/ITeamFormInputs";
import { updateTeam } from "../../core/redux/slices/team/teamActions";

const EditTeam: FC = () => {
  const { editTeamContainer } = styles;
  const { teamId } = useParams();
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
    dispatch(updateTeam(dataToServer) as any);
  };

  return (
    <>
      {teamId && (
        <div className={editTeamContainer}>
          <TeamForm
            loading={loading}
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
