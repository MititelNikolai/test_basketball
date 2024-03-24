import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetError,
  resetSuccess,
  selectAuthStatus,
  selectIsAuthenticated,
} from "../../core/redux/slices/auth/authSlice";
import { registerUser } from "../../core/redux/slices/auth/authActions";
import { RegisterData } from "../../core/redux/slices/auth/auth.interfaces";
import SingUp from "../../assets/img/singUp.png";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import RegisterForm from "./components/RegisterForm";

const Register: FC = () => {
  const navigate = useNavigate();

  const { loading, success, error } = useSelector(selectAuthStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatchUser = useTypedDispatch();
  const dispatch = useDispatch();

  const handleSubmit = (data: RegisterData) => dispatchUser(registerUser(data));

  useEffect(() => {
    if (success) navigate("/login");
    if (isAuthenticated) navigate("/");
    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [navigate, isAuthenticated, success, dispatch]);

  return (
    <>
      <AuthLayout image={SingUp}>
        <RegisterForm
          onSubmit={(data) => handleSubmit(data)}
          loading={loading}
          error={error}
        />
      </AuthLayout>
    </>
  );
};

export default Register;
