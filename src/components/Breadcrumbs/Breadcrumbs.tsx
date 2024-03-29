import { FC, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashIntoSpace } from "../../utils/stringFunctions";
import { IconCreate, IconDelete } from "../ui/icons";
import { BreadcrumbsProps } from "./BreadcrumbsProps";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  pathname,
  actions = false,
  deleteAction,
  successAction,
  id,
  success,
  needBorder,
}) => {
  const {
    breadcrumbsContainer,
    breadcrumbsBorder,
    breadcrumbsStyle,
    separateStyle,
    singleTeamActions,
    deleteButton,
  } = styles;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = pathname.split("/").filter((x) => x);

  useEffect(() => {
    if (success) {
      const match = location.pathname.match(/^\/([^/]+)/);
      const currentUrl = match ? match[0] : "/";
      successAction && dispatch(successAction);
      navigate(currentUrl);
    }
  }, [navigate, dispatch, success, location.pathname, successAction]);

  return (
    <div
      className={
        needBorder
          ? [breadcrumbsContainer, breadcrumbsBorder].join(" ")
          : breadcrumbsContainer
      }
    >
      <div>
        {pathnames.map((linkName, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayedName = dashIntoSpace(linkName);
          return (
            <span className={breadcrumbsStyle} key={linkName}>
              {isLast ? (
                displayedName
              ) : (
                <Link to={routeTo}>{displayedName}</Link>
              )}
              <span className={separateStyle}>{!isLast && "/"}</span>
            </span>
          );
        })}
      </div>
      {actions && (
        <div className={singleTeamActions}>
          <Link to={`${id}/edit`}>
            <IconCreate height={24} width={24} />
          </Link>
          <div
            className={deleteButton}
            onClick={() => {
              deleteAction && dispatch(deleteAction as any);
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
