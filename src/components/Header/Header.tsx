import { FC } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../core/redux/slices/auth/authSlice";
import { IconProfile, IconBurgerMenu } from "../ui/icons";
import { IUser } from "../../core/redux/slices/auth/auth.interfaces";
import { MobileSidebar } from "../index";
import logo from "../../assets/img/logo.png";
import HeaderProps from "./HeaderProps";
import styles from "./Header.module.css";

const Header: FC<HeaderProps> = ({ menuToggle, menuState }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const userData: IUser | null = useSelector(selectCurrentUser);
  if (!userData.token) {
    localStorage.removeItem("userData");
    <Navigate to='/login' />;
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <div onClick={menuToggle} className={styles.headerMobileMenu}>
          {menuState ? <IconBurgerMenu /> : <IconBurgerMenu opacity='1' />}
        </div>
        <div className={styles.logoWrapper}>
          <NavLink to='/'>
            <img className={styles.headerLogo} src={logo} alt='Logo' />
          </NavLink>
        </div>

        <div className={styles.userContainer}>
          <NavLink to='/edit-profile'>
            <p className={styles.userName}>{userData?.name}</p>

            {userData?.avatarUrl ? (
              <img
                className={styles.userAvatar}
                src={`${backendUrl}${userData?.avatarUrl}` || ""}
                alt='Avatar'
              />
            ) : (
              <IconProfile width={36} height={36} />
            )}
          </NavLink>
        </div>
      </header>
      <div className={styles.leftMenu}>
        {menuState ? <MobileSidebar handleClick={menuToggle} /> : <></>}
      </div>
    </>
  );
};

export default Header;
