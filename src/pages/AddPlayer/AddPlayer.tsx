import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentPlayer,
  resetAddedPlayerSuccess,
  resetPlayerSuccess,
  selectPlayerStatus,
} from "../../core/redux/slices/player/playerSlice";
import { selectCurrentUser } from "../../core/redux/slices/auth/authSlice";
import { IPlayerDataToServer } from "../../core/redux/slices/player/player.interfaces";
import { playerAdd } from "../../core/redux/slices/player/playerAction";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import PlayerForm from "./components/PlayerForm";
import { IPlayerFormInputs } from "./components/PlayerForm.interfaces";
import styles from "./AddPlayer.module.css";

const AddPlayer: FC = () => {
  const { addPlayerContainer } = styles;

  const { loading, success, addedPlayerSuccess, error } =
    useSelector(selectPlayerStatus);
  const userInfo = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchPlayers = useTypedDispatch();
  dispatch(resetCurrentPlayer());

  const handleSubmit = async (formData: IPlayerFormInputs) => {
    const { name, number, position, team, birthday } = formData;
    const dataToServer: IPlayerDataToServer = {
      name: name.trim(),
      number: Number(number),
      position,
      team: Number(team),
      birthday: new Date(birthday).toISOString(),
      height: Number(formData.height),
      weight: Number(formData.weight),
      avatarUrl:
        formData.file_img &&
        (await uploadImageToServer(formData.file_img, userInfo.token)),
    };
    dispatchPlayers(playerAdd(dataToServer));
  };

  useEffect(() => {
    if (addedPlayerSuccess) {
      dispatch(resetPlayerSuccess());
      navigate(`/players/${addedPlayerSuccess}`);
    }
    return () => {
      dispatch(resetAddedPlayerSuccess());
    };
  }, [navigate, dispatch, success, addedPlayerSuccess]);

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
