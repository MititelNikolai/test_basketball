import { FC, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSuccess,
  selectTeam,
} from "../../core/redux/slices/team/teamSlice";
import { deleteTeam, getTeam } from "../../core/redux/slices/team/teamActions";
import { RootState } from "../../core/redux/store";

const TeamsActionsLayout: FC = () => {
  const location = useLocation();
  const { teamId } = useParams();
  const team = useSelector(selectTeam);
  const { loading, success } = useSelector((state: RootState) => state.team);
  const dispatch = useDispatch();
  useEffect(() => {
    if (team?.id !== Number(teamId)) {
      location.pathname !== `/teams` &&
        location.pathname !== `/teams/add-team` &&
        dispatch(getTeam(Number(teamId)) as any);
    }
  }, [dispatch, teamId, team?.id, location.pathname]);
  return (
    <div>
      {!loading && (
        <>
          <Breadcrumbs
            id={Number(teamId)}
            deleteAction={teamId && deleteTeam(Number(teamId))}
            success={success}
            successAction={resetSuccess()}
            pathname={
              location.pathname !== `/teams/add-team`
                ? `/teams/${team?.name}`
                : location.pathname
            }
            actions={location.pathname === `/teams/${teamId}`}
          />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default TeamsActionsLayout;
