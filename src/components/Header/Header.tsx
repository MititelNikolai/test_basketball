import { FC } from "react";
import logo from "../../assets/img/logo.png";
import IconProfile from "../../ui/icons/IconProfile";
import styles from "./Header.module.css";
import { IUser } from "../../core/redux/slices/auth/auth.types";
import { NavLink, Navigate } from "react-router-dom";
import { backendUrl } from "../../core/redux/apiData";
import IconBurgerMenu from "../../ui/icons/IconBurgerMenu";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
interface IHeaderProps {
  menuToggle: () => void;
  menuState: boolean;
}
const Header: FC<IHeaderProps> = ({ menuToggle, menuState }) => {
  const {
    headerContainer,
    userContainer,
    userName,
    userAvatar,
    headerMobileMenu,
    logoWrapper,
    headerLogo,
    leftMenu,
  } = styles;

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
                src={`${backendUrl}${userData?.avatarUrl}` || ""}
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
