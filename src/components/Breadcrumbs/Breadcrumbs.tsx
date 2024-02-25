import { FC, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { IBreadcrumbsProps } from "./IBreadcrumbsProps";
import { dashIntoSpace } from "../../utils/stringFunctions";
import IconCreate from "../../ui/icons/IconCreate";
import IconDelete from "../../ui/icons/IconDelete";
import { useDispatch } from "react-redux";

const Breadcrumbs: FC<IBreadcrumbsProps> = ({
  pathname,
  actions = false,
  deleteAction,
  successAction,
  id,
  success,
  needBorder,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (success) {
      const match = location.pathname.match(/^\/([^/]+)/);
      const currentUrl = match ? match[0] : "/";
      successAction && dispatch(successAction);
      navigate(currentUrl);
    }
  }, [navigate, dispatch, success, location.pathname, successAction]);
  const {
    breadcrumbsContainer,
    breadcrumbsBorder,
    breadcrumbsStyle,
    separateStyle,
    singleTeamActions,
    deleteButton,
  } = styles;

  const pathnames = pathname.split("/").filter((x) => x);
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
