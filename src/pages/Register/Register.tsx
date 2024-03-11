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
import { IRegisterData } from "../../core/redux/slices/auth/auth.interfaces";
import SingUp from "../../assets/img/singUp.png";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import AuthorizationLayout from "../../layouts/Authorization/AuthorizationLayout";
import RegisterForm from "./components/RegisterForm";

const Register: FC = () => {
  const { loading, success, error } = useSelector(selectAuthStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatchUser = useTypedDispatch();
  const dispatch = useDispatch();

  const handleSubmit = (data: IRegisterData) =>
    dispatchUser(registerUser(data));

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
