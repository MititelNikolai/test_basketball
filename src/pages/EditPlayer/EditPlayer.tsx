import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentPlayer,
  resetPlayerSuccess,
  selectPlayerStatus,
} from "../../core/redux/slices/player/playerSlice";
import { updatePlayer } from "../../core/redux/slices/player/playerAction";
import { selectCurrentUser } from "../../core/redux/slices/auth/authSlice";
import { IPlayerData } from "../../core/redux/slices/player/player.interfaces";
import { IPlayerFormInputs } from "../AddPlayer/components/PlayerForm.interfaces";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import PlayerForm from "../AddPlayer/components/PlayerForm";
import styles from "./EditPlayer.module.css";

const EditPlayer: FC = () => {
  const { editPlayerContainer } = styles;

  const { loading, success, error } = useSelector(selectPlayerStatus);
  const userInfo = useSelector(selectCurrentUser);
  const { playerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchPlayers = useTypedDispatch();

  useEffect(() => {
    if (success) {
      dispatch(resetPlayerSuccess());
      dispatch(resetCurrentPlayer());
      navigate(`/players/${playerId}`);
    }
  }, [navigate, dispatch, success, playerId]);

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
    dispatchPlayers(updatePlayer(dataToServer));
  };
  return (
    <>
      {playerId && (
        <div className={editPlayerContainer}>
          <PlayerForm
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

export default EditPlayer;
