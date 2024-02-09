import { FC } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Dashboard.module.css";
const Dashboard: FC = () => {
  const { flexContainer, innerContainer } = styles;
  return (
    <>
      <Header />
      <div className={flexContainer}>
        <Sidebar />
        <div className={innerContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
