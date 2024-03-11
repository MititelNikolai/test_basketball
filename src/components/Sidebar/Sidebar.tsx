import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../core/redux/slices/auth/authSlice";
import { links } from "./SidebarLinks";
import { IconInput } from "../ui/icons";
import styles from "./Sidebar.module.css";

const Sidebar: FC = () => {
  const { sideBarContainer, linkContainer, linkWrapper, linkText } = styles;
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <nav className={sideBarContainer}>
      <div className={linkWrapper}>
        {links.map((link) => {
          const active = location.pathname.includes(`/${link.link}`)
            ? "#E4163A"
            : undefined;
          return (
            <NavLink to={link.link} className={linkContainer} key={link.id}>
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
    </nav>
  );
};

export default Sidebar;
