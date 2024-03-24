import { FC } from "react";
import { AuthLayoutProps } from "./AuthLayoutProps";
import styles from "./AuthLayout.module.css";

const AuthLayout: FC<AuthLayoutProps> = ({ image, children }) => {
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

export default AuthLayout;
