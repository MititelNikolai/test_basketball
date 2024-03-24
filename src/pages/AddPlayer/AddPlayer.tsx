import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentPlayer,
  resetAddedPlayerSuccess,
  resetPlayerSuccess,
  selectPlayerStatus,
  resetPlayersError,
  setPlayersError,
} from "../../core/redux/slices/player/playerSlice";
import { PlayerDataToServer } from "../../core/redux/slices/player/player.interfaces";
import { playerAdd } from "../../core/redux/slices/player/playerAction";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useImageCompression } from "../../hooks/useImageCompression";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import PlayerForm from "./components/PlayerForm";
import { PlayerFormInputs } from "./components/PlayerForm.interfaces";
import styles from "./AddPlayer.module.css";

const AddPlayer: FC = () => {
  const { addPlayerContainer } = styles;

  const navigate = useNavigate();
  const compress = useImageCompression(531, 531);

  const { loading, success, addedPlayerSuccess, error } =
    useSelector(selectPlayerStatus);

  const dispatch = useDispatch();
  const dispatchPlayers = useTypedDispatch();

  dispatch(resetCurrentPlayer());

  const handleSubmit = async (formData: PlayerFormInputs) => {
    const { name, number, position, team, birthday } = formData;
    const dataToServer: PlayerDataToServer = {
      name: name.trim(),
      number: Number(number),
      position,
      team: Number(team),
      birthday: new Date(birthday).toISOString(),
      height: Number(formData.height),
      weight: Number(formData.weight),
      avatarUrl:
        formData.file_img &&
        (await uploadImageToServer(await compress(formData.file_img))),
    };

    dataToServer.avatarUrl
      ? dispatchPlayers(playerAdd(dataToServer))
      : dispatch(setPlayersError("Failed to upload Image"));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetPlayersError());
      }, 3100);
    }
    if (addedPlayerSuccess) {
      dispatch(resetPlayerSuccess());
      navigate(`/players/${addedPlayerSuccess}`);
    }
    return () => {
      dispatch(resetAddedPlayerSuccess());
    };
  }, [navigate, dispatch, success, addedPlayerSuccess, error]);

  return (
    <section className={addPlayerContainer}>
      <PlayerForm
        onSubmit={(data) => handleSubmit(data)}
        loading={loading}
        error={error}
      />
    </section>
  );
};

export default AddPlayer;
