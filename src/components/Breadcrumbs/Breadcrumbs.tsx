import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { IBreadcrumbsProps } from "./IBreadcrumbsProps";
import dashIntoSpace from "../../utils/dashIntoSpace";

const Breadcrumbs: FC<IBreadcrumbsProps> = ({ pathname }) => {
  const { breadcrumbsContainer, breadcrumbsStyle, separateStyle } = styles;
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <div className={breadcrumbsContainer}>
      {pathnames.map((linkName, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const DisplayedName = dashIntoSpace(linkName);
        return (
          <span className={breadcrumbsStyle} key={linkName}>
            {isLast ? DisplayedName : <Link to={routeTo}>{DisplayedName}</Link>}
            <span className={separateStyle}>{!isLast && "/"}</span>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
