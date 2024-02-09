import { FC } from "react";
import { useSelector } from "react-redux";
import IPrivateRouter from "./IPrivateRouter";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../core/redux/slices/authSlice";

const PrivateRouter: FC<IPrivateRouter> = ({ component: RouteComponent }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <RouteComponent /> : <Navigate to='/login' />;
};

export default PrivateRouter;
