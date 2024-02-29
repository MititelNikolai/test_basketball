import { FC, useEffect } from "react";
import AuthorizationLayout from "../../layouts/authorization/AuthorizationLayout";
import SingUp from "../../assets/img/singUp.png";
import RegisterForm from "./components/RegisterForm";
import {
  AllAuthActions,
  registerUser,
} from "../../core/redux/slices/auth/authActions";
import { IRegisterData } from "../../core/redux/slices/auth/auth.types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../core/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { resetError } from "../../core/redux/slices/auth/authSlice";

const Register: FC = () => {
  const { loading, success, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const dispatchUser: ThunkDispatch<RootState, void, AllAuthActions> =
    useDispatch();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) navigate("/login");
    if (isAuthenticated) navigate("/");
    return () => {
      dispatch(resetError());
    };
  }, [navigate, isAuthenticated, success, dispatch]);

  const handleSubmit = (data: IRegisterData) =>
    dispatchUser(registerUser(data));
  return (
    <>
      <AuthorizationLayout image={SingUp}>
        <RegisterForm
          onSubmit={(data) => handleSubmit(data)}
          loading={loading}
          error={error}
        />
      </AuthorizationLayout>
    </>
  );
};

export default Register;
