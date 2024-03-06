import { FC, useEffect } from "react";
import styles from "./AddPlayer.module.css";
import PlayerForm from "./components/PlayerForm";
import uploadImageToServer from "../../api/imageRequests/uploadImageToServer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { useNavigate } from "react-router-dom";
import {
  clearCurrentPlayer,
  resetAddedPlayerSuccess,
  resetSuccess,
} from "../../core/redux/slices/player/playerSlice";
import { IPlayerFormInputs } from "./components/IPlayerFormProps";
import { IPlayerDataToServer } from "../../core/redux/slices/player/player.types";
import {
  AllPlayersActions,
  playerAdd,
} from "../../core/redux/slices/player/playerAction";
import { ThunkDispatch } from "@reduxjs/toolkit";
const AddPlayer: FC = () => {
  const { addPlayerContainer } = styles;

  const { loading, success, addedPlayerSuccess, error } = useSelector(
    (state: RootState) => state.player
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchPlayers: ThunkDispatch<RootState, void, AllPlayersActions> =
    useDispatch();
  dispatch(clearCurrentPlayer());
  useEffect(() => {
    if (addedPlayerSuccess) {
      dispatch(resetSuccess());
      navigate(`/players/${addedPlayerSuccess}`);
    }
    return () => {
      dispatch(resetAddedPlayerSuccess());
    };
  }, [navigate, dispatch, success, addedPlayerSuccess]);

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
