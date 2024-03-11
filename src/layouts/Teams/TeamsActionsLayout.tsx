import { FC, useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  resetTeamSuccess,
  selectTeam,
  selectTeamStatus,
} from "../../core/redux/slices/team/teamSlice";
import { deleteTeam, getTeam } from "../../core/redux/slices/team/teamActions";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { Breadcrumbs } from "../../components";

const TeamsActionsLayout: FC = () => {
  const location = useLocation();
  const { teamId } = useParams();
  const team = useSelector(selectTeam);
  const { loading, success } = useSelector(selectTeamStatus);
  const dispatchTeam = useTypedDispatch();

  useEffect(() => {
    if (team?.id !== Number(teamId)) {
      location.pathname !== `/teams` &&
        location.pathname !== `/teams/add-team` &&
        dispatchTeam(getTeam(Number(teamId)));
    }
  }, [dispatchTeam, teamId, team?.id, location.pathname]);

  return (
    <div>
      {!loading && (
        <>
          <Breadcrumbs
            needBorder={location.pathname === `/teams/${teamId}`}
            id={Number(teamId)}
            deleteAction={teamId && deleteTeam(Number(teamId))}
            success={success}
            successAction={resetTeamSuccess()}
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
