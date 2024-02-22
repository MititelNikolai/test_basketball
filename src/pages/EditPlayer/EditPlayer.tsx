import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetSuccess } from "../../core/redux/slices/player/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { IPlayerData } from "../../core/redux/slices/player/player.types";
import uploadImageToServer from "../../api/imageRequests/uploadImageToServer";
import { updatePlayer } from "../../core/redux/slices/player/playerAction";
import { IPlayerFormInputs } from "../AddPlayer/components/IPlayerFormProps";
import PlayerForm from "../AddPlayer/components/PlayerForm";
import styles from "./EditPlayer.module.css";
const EditPlayer: FC = () => {
  const { editPlayerContainer } = styles;
  const { loading, success } = useSelector((state: RootState) => state.player);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { playerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("/players");
    }
  }, [navigate, dispatch, success]);

  const handleSubmit = async (formData: IPlayerFormInputs) => {
    const { name, number, position, team, birthday } = formData;
    const dataToServer: IPlayerData = {
      id: Number(playerId),
      name: name.trim(),
      number: Number(number),
      position,
      team: Number(team),
      birthday: new Date(birthday).toISOString(),
      height: Number(formData.height),
      weight: Number(formData.weight),
      avatarUrl: formData.file_img
        ? await uploadImageToServer(formData.file_img, userInfo.token)
        : formData.avatarUrl,
    };
    dispatch(updatePlayer(dataToServer) as any);
  };
  return (
    <>
      {playerId && (
        <div className={editPlayerContainer}>
          <PlayerForm
            loading={loading}
            edit
            onSubmit={(data) => {
              handleSubmit(data);
            }}
          />
        </div>
      )}
      ;
    </>
  );
};

export default EditPlayer;
