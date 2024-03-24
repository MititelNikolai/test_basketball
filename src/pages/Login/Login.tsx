import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../core/redux/slices/auth/authActions";
import {
  resetError,
  selectAuthStatus,
  selectIsAuthenticated,
} from "../../core/redux/slices/auth/authSlice";
import { LoginData } from "../../core/redux/slices/auth/auth.interfaces";
import SingIn from "../../assets/img/singIn.png";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import LoginForm from "./components/LoginForm";

const Login: FC = () => {
  const navigate = useNavigate();

  const { loading, error } = useSelector(selectAuthStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatchLogin = useTypedDispatch();
  const dispatch = useDispatch();

  const handleSubmit = (data: LoginData) => {
    dispatchLogin(userLogin(data));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    return () => {
      dispatch(resetError());
    };
  }, [navigate, isAuthenticated, dispatch]);

  return (
    <>
      <AuthLayout image={SingIn}>
        <LoginForm
          onSubmit={(data) => handleSubmit(data)}
          loading={loading}
          error={error}
        />
      </AuthLayout>
    </>
  );
};

export default Login;
