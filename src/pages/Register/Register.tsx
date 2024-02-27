import { FC, useEffect } from "react";
import AuthorizationLayout from "../../layouts/authorization/AuthorizationLayout";
import SingUp from "../../assets/img/singUp.png";
import RegisterForm from "./components/RegisterForm";
import { registerUser } from "../../core/redux/slices/auth/authActions";
import { IRegisterData } from "../../core/redux/slices/auth/auth.types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../core/redux/store";

const Register: FC = () => {
  const { loading, success, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate("/login");
    if (isAuthenticated) navigate("/");
  }, [navigate, isAuthenticated, success]);
  const dispatch = useDispatch();

  const handleSubmit = (data: IRegisterData) =>
    dispatch(registerUser(data) as any);
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
