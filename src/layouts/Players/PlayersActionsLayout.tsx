import { FC, useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  deletePlayer,
  getPlayer,
} from "../../core/redux/slices/player/playerAction";
import {
  resetPlayerSuccess,
  selectPlayer,
  selectPlayerStatus,
} from "../../core/redux/slices/player/playerSlice";
import { Breadcrumbs } from "../../components";

const PlayersActionsLayout: FC = () => {
  const location = useLocation();
  const { playerId } = useParams();

  const player = useSelector(selectPlayer);
  const { loading, success } = useSelector(selectPlayerStatus);

  const dispatchPlayers = useTypedDispatch();

  useEffect(() => {
    if (player?.id !== Number(playerId)) {
      location.pathname !== `/players` &&
        location.pathname !== `/players/add-player` &&
        dispatchPlayers(getPlayer(Number(playerId)));
    }
  }, [dispatchPlayers, playerId, player?.id, location.pathname]);

  return (
    <div>
      <div>
        {!loading && (
          <>
            {location.pathname !== `/players/add-player` ? (
              <>
                <Breadcrumbs
                  id={Number(playerId)}
                  deleteAction={playerId && deletePlayer(Number(playerId))}
                  success={success}
                  successAction={resetPlayerSuccess()}
                  pathname={`/players/${player?.name}`}
                  actions={location.pathname === `/players/${playerId}`}
                />
                <Outlet />
              </>
            ) : (
              <>
                <Breadcrumbs pathname={location.pathname} />
                <Outlet />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlayersActionsLayout;
