import { FC } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../core/redux/slices/auth/authSlice";
import { User } from "../../core/redux/slices/auth/auth.interfaces";
import { links } from "../Sidebar/SidebarLinks";
import { IconProfile, IconInput } from "../ui/icons";
import { MobileSidebarProps } from "./MobileSidebarProps";
import styles from "./MobileSidebar.module.css";

const MobileSidebar: FC<MobileSidebarProps> = ({ handleClick }) => {
  const {
    mobileSidebarContainer,
    mobileSidebarBackground,
    mobileSidebarContent,
    userContainer,
    userName,
    userAvatar,
    linksContainer,
    linkWrapper,
    linkContainer,
    linkText,
  } = styles;

  const dispatch = useDispatch();
  const location = useLocation();

  let userData: User | null = null;

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
    <nav className={mobileSidebarContainer}>
      <div className={mobileSidebarBackground} onClick={handleClick} />
      <div className={mobileSidebarContent}>
        <NavLink
          to='/edit-profile'
          className={userContainer}
          onClick={handleClick}
        >
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
          <p className={userName}>{userData?.name}</p>
        </NavLink>
        <div className={linksContainer}>
          <div className={linkWrapper}>
            {links.map((link) => {
              const active = location.pathname.includes(`/${link.link}`)
                ? "#E4163A"
                : undefined;
              return (
                <NavLink
                  onClick={handleClick}
                  to={link.link}
                  className={linkContainer}
                  key={link.id}
                >
                  <link.icon color={active} height={24} width={24} />
                  <p className={linkText} style={{ color: active }}>
                    {link.label}
                  </p>
                </NavLink>
              );
            })}
          </div>
          <div
            className={linkContainer}
            onClick={() => {
              dispatch(logout());
            }}
          >
            <IconInput color='#FF768E' height={24} width={24} />
            <p className={linkText} style={{ color: "#FF768E" }}>
              Sign out
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileSidebar;
