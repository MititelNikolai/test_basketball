import { FC } from "react";
import styles from "./SinglePlayer.module.css";
import { useSelector } from "react-redux";
import { selectPlayer } from "../../core/redux/slices/player/playerSlice";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";

const SinglePlayer: FC = () => {
  const { singlePlayerContainer } = styles;

  const player = useSelector(selectPlayer);
  return (
    <>
      {player && (
        <section className={singlePlayerContainer}>
          {player && <PlayerInfo {...player} />}
        </section>
      )}
    </>
  );
};

export default SinglePlayer;
