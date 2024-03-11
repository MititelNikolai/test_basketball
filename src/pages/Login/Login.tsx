import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../core/redux/slices/auth/authActions";
import {
  resetError,
  selectAuthStatus,
  selectIsAuthenticated,
} from "../../core/redux/slices/auth/authSlice";
import SingIn from "../../assets/img/singIn.png";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import AuthorizationLayout from "../../layouts/Authorization/AuthorizationLayout";
import LoginForm from "./components/LoginForm";
import { ILoginData } from "../../core/redux/slices/auth/auth.interfaces";

const Authorization: FC = () => {
  const { loading, error } = useSelector(selectAuthStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatchLogin = useTypedDispatch();
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
