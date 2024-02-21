import { FC } from "react";
import styles from "./SinglePlayer.module.css";
import { useSelector } from "react-redux";
import { selectPlayer } from "../../core/redux/slices/player/playerSlice";
const SinglePlayer: FC = () => {
  const { singlePlayerContainer } = styles;
  const player = useSelector(selectPlayer);
  return (
    <>
      {player && (
        <section className={singlePlayerContainer}>
          {/*  <TeamInfo {...player} /> */}
        </section>
      )}
    </>
  );
};

export default SinglePlayer;
