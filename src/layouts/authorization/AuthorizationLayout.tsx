import { FC } from "react";
import AuthorizationLayoutProps from "./AuthorizationLayoutProps";
import styles from "./AuthorizationLayout.module.css";

const AuthorizationLayout: FC<AuthorizationLayoutProps> = ({
  image,
  children,
}) => {
  const {
    authLayoutContainer,
    authLayoutLeft,
    authLayoutLeftForm,
    authLayoutRight,
  } = styles;
  return (
    <div className={authLayoutContainer}>
      <div className={authLayoutLeft}>
        <div className={authLayoutLeftForm}>{children}</div>
      </div>
      <div className={authLayoutRight}>
        <img src={image} alt='' />
      </div>
    </div>
  );
};

export default AuthorizationLayout;
