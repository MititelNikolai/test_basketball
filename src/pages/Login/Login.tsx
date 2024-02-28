import { FC, useEffect } from "react";
import AuthorizationLayout from "../../layouts/authorization/AuthorizationLayout";
import SingIn from "../../assets/img/singIn.png";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import {
  AllAuthActions,
  userLogin,
} from "../../core/redux/slices/auth/authActions";
import { ILoginData } from "../../core/redux/slices/auth/auth.types";

import { useNavigate } from "react-router-dom";
import { RootState } from "../../core/redux/store";
import { resetError } from "../../core/redux/slices/auth/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
const Authorization: FC = () => {
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatchLogin: ThunkDispatch<RootState, void, AllAuthActions> =
    useDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
    return () => {
      dispatch(resetError());
    };
  }, [navigate, isAuthenticated, dispatch]);
  const handleSubmit = (data: ILoginData) => {
    dispatchLogin(userLogin(data));
  };
  return (
    <>
      <AuthorizationLayout image={SingIn}>
        <LoginForm
          onSubmit={(data) => handleSubmit(data)}
          loading={loading}
          error={error}
        />
      </AuthorizationLayout>
    </>
  );
};

export default Authorization;
