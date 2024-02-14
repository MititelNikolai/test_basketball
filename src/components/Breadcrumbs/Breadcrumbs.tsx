import { FC, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { IBreadcrumbsProps } from "./IBreadcrumbsProps";
import { dashIntoSpace } from "../../utils/stringFunctions";
import IconCreate from "../../ui/icons/IconCreate";
import IconDelete from "../../ui/icons/IconDelete";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam } from "../../core/redux/slices/team/teamActions";
import { RootState } from "../../core/redux/store";
import { resetSuccess } from "../../core/redux/slices/team/teamSlice";

const Breadcrumbs: FC<IBreadcrumbsProps> = ({ pathname, actions = false }) => {
  const dispatch = useDispatch();
  const { success } = useSelector((state: RootState) => state.team);
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("/teams");
    }
  }, [navigate, dispatch, success]);
  const {
    breadcrumbsContainer,
    breadcrumbsStyle,
    separateStyle,
    singleTeamActions,
    deleteButton,
  } = styles;
  const { teamId } = useParams();

  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <div className={breadcrumbsContainer}>
      <div>
        {pathnames.map((linkName, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const DisplayedName = dashIntoSpace(linkName);
          return (
            <span className={breadcrumbsStyle} key={linkName}>
              {isLast ? (
                DisplayedName
              ) : (
                <Link to={routeTo}>{DisplayedName}</Link>
              )}
              <span className={separateStyle}>{!isLast && "/"}</span>
            </span>
          );
        })}
      </div>
      {actions && (
        <div className={singleTeamActions}>
          <Link to={`${teamId}/edit`}>
            <IconCreate height={24} width={24} />
          </Link>
          <div
            className={deleteButton}
            onClick={() => {
              dispatch(deleteTeam(Number(teamId)) as any);
            }}
          >
            <IconDelete height={24} width={24} color='#E4163A' />
          </div>
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;
