import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../../components";
import styles from "./DashboardLayout.module.css";

const DashboardLayout: FC = () => {
  const { flexContainer, innerContainer, sidebarWrapper } = styles;
  const [activeMenu, setActiveMenu] = useState(false);

  const menuToggler = () => setActiveMenu((prev) => !prev);

  return (
    <>
      <Header menuToggle={menuToggler} menuState={activeMenu} />
      <div className={flexContainer}>
        <div className={sidebarWrapper}>
          <Sidebar />
        </div>
        <div
          style={{ overflow: activeMenu ? "hidden" : "scroll" }}
          className={innerContainer}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
