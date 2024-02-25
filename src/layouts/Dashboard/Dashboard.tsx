import { FC, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Dashboard.module.css";
const Dashboard: FC = () => {
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
          style={{ overflow: activeMenu ? "hidden" : "auto" }}
          className={innerContainer}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
