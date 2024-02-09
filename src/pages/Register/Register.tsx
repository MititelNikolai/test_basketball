import { FC, useEffect } from "react";
import AuthorizationLayout from "../../layouts/authorization/AuthorizationLayout";
import SingUp from "../../assets/img/singUp.png";
import RegisterForm from "./components/RegisterForm";
import {
  registerUser,
  IRegisterData,
} from "../../core/redux/slices/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register: FC = () => {
  const { loading, userInfo, success } = useSelector(
    (state: any) => state.auth
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (success) navigate("/login");
    console.log("Current token", userInfo.token);
    if (userInfo.token) navigate("/dashboard");
  }, [navigate, userInfo, success]);
  const dispatch = useDispatch();
  const handleSubmit = (data: IRegisterData) => {
    console.log(data);
    dispatch(registerUser(data) as any);
  };

  return (
    <>
      <AuthorizationLayout image={SingUp}>
        <RegisterForm
          onSubmit={(data) => handleSubmit(data)}
          loading={loading}
        />
      </AuthorizationLayout>
    </>
  );
};

export default Register;
