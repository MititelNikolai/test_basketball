import { FC } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../core/redux/slices/auth/authSlice";
import { IconProfile, IconBurgerMenu } from "../ui/icons";
import { User } from "../../core/redux/slices/auth/auth.interfaces";
import { MobileSidebar } from "../index";
import logo from "../../assets/img/logo.png";
import { HeaderProps } from "./HeaderProps";
import styles from "./Header.module.css";

const Header: FC<HeaderProps> = ({ menuToggle, menuState }) => {
  const {
    headerContainer,
    headerLogo,
    userContainer,
    headerMobileMenu,
    logoWrapper,
    userName,
    userAvatar,
    leftMenu,
  } = styles;

  const userData: User | null = useSelector(selectCurrentUser);

  if (!userData.token) {
    localStorage.removeItem("userData");
    <Navigate to='/login' />;
  }

  return (
    <>
      <header className={headerContainer}>
        <div onClick={menuToggle} className={headerMobileMenu}>
          {menuState ? <IconBurgerMenu /> : <IconBurgerMenu opacity='1' />}
        </div>
        <div className={logoWrapper}>
          <NavLink to='/'>
            <img className={headerLogo} src={logo} alt='Logo' />
          </NavLink>
        </div>

        <div className={userContainer}>
          <NavLink to='/edit-profile'>
            <p className={userName}>{userData?.name}</p>

            {userData?.avatarUrl ? (
              <img
                className={userAvatar}
                src={
                  `${process.env.REACT_APP_BACKEND_URL}${userData?.avatarUrl}` ||
                  ""
                }
                alt='Avatar'
              />
            ) : (
              <IconProfile width={36} height={36} />
            )}
          </NavLink>
        </div>
      </header>
      <div className={leftMenu}>
        {menuState ? <MobileSidebar handleClick={menuToggle} /> : <></>}
      </div>
    </>
  );
};

export default Header;
