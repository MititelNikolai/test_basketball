import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentPlayer,
  resetPlayerSuccess,
  resetPlayersError,
  selectPlayerStatus,
  setPlayersError,
} from "../../core/redux/slices/player/playerSlice";
import { updatePlayer } from "../../core/redux/slices/player/playerAction";
import { PlayerData } from "../../core/redux/slices/player/player.interfaces";
import { PlayerFormInputs } from "../AddPlayer/components/PlayerForm.interfaces";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useImageCompression } from "../../hooks/useImageCompression";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import PlayerForm from "../AddPlayer/components/PlayerForm";
import styles from "./EditPlayer.module.css";

const EditPlayer: FC = () => {
  const { editPlayerContainer } = styles;

  const navigate = useNavigate();
  const { playerId } = useParams();

  const { loading, success, error } = useSelector(selectPlayerStatus);

  const dispatch = useDispatch();
  const dispatchPlayers = useTypedDispatch();
  const compress = useImageCompression(210, 210);

  const handleSubmit = async (formData: PlayerFormInputs) => {
    const { name, number, position, team, birthday } = formData;
    const dataToServer: PlayerData = {
      id: Number(playerId),
      name: name.trim(),
      number: Number(number),
      position,
      team: Number(team),
      birthday: new Date(birthday).toISOString(),
      height: Number(formData.height),
      weight: Number(formData.weight),
      avatarUrl: formData.file_img
        ? await uploadImageToServer(await compress(formData.file_img))
        : formData.avatarUrl,
    };
    dataToServer.avatarUrl
      ? dispatchPlayers(updatePlayer(dataToServer))
      : dispatch(setPlayersError("Failed to upload Image"));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetPlayersError());
      }, 3100);
    }
    if (success) {
      dispatch(resetPlayerSuccess());
      dispatch(resetCurrentPlayer());
      navigate(`/players/${playerId}`);
    }
  }, [navigate, dispatch, success, playerId, error]);

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
