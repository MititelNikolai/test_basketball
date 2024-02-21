import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import {
  resetSuccess,
  selectPlayer,
} from "../../core/redux/slices/player/playerSlice";
import { RootState } from "../../core/redux/store";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  deletePlayer,
  getPlayer,
} from "../../core/redux/slices/player/playerAction";

const PlayersActionsLayout: FC = () => {
  const location = useLocation();
  const { playerId } = useParams();
  const player = useSelector(selectPlayer);
  const { loading, success } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("PlayersActionsRendered");
    if (player?.id !== Number(playerId)) {
      location.pathname !== `/players` &&
        location.pathname !== `/players/add-player` &&
        dispatch(getPlayer(Number(playerId)) as any);
    }
  }, [dispatch, playerId, player?.id, location.pathname]);
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
                  successAction={resetSuccess()}
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
