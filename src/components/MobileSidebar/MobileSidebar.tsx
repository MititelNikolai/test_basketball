import { FC } from "react";
import { links } from "../Sidebar/SidebarLinks";
import { IUser } from "../../core/redux/slices/auth/auth.types";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import styles from "./MobileSidebar.module.css";
import { backendUrl } from "../../core/redux/apiData";
import IconProfile from "../../ui/icons/IconProfile";
import { useDispatch } from "react-redux";
import { logout } from "../../core/redux/slices/auth/authSlice";
import IconInput from "../../ui/icons/IconInput";
interface IMobileSidebarProps {
  handleClick: () => void;
}
const MobileSidebar: FC<IMobileSidebarProps> = ({ handleClick }) => {
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
              src={`${backendUrl}${userData?.avatarUrl}` || ""}
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
              const active =
                location.pathname === `/${link.link}` ? "#E4163A" : undefined;
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
