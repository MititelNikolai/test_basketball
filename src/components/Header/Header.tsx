import { FC } from "react";
import logo from "../../assets/img/logo.png";
import IconProfile from "../../ui/icons/IconProfile";
import styles from "./Header.module.css";
import { IUser } from "../../core/redux/slices/auth/auth.types";
import { NavLink, Navigate } from "react-router-dom";
const Header: FC = () => {
  const { headerContainer, userContainer, userName, userAvatar } = styles;
  let userData: IUser | null = null;
  try {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      userData = JSON.parse(storedUserData);
    }
  } catch (error) {
    localStorage.removeItem("userData");
    <Navigate to='/login' />;
  }

  return (
    <header className={headerContainer}>
      <NavLink to='/'>
        <img src={logo} alt='Logo' />
      </NavLink>
      <NavLink to='/edit-profile'>
        <div className={userContainer}>
          <p className={userName}>{userData?.name}</p>

          {userData?.avatarUrl ? (
            <img
              className={userAvatar}
              src={userData?.avatarUrl || ""}
              alt='Avatar'
            />
          ) : (
            <IconProfile width={36} height={36} />
          )}
        </div>
      </NavLink>
    </header>
  );
};

export default Header;
