import { FC, useEffect } from "react";
import AuthorizationLayout from "../../layouts/authorization/AuthorizationLayout";
import SingIn from "../../assets/img/singIn.png";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { ILoginData, userLogin } from "../../core/redux/slices/authActions";
import { useNavigate } from "react-router-dom";
const Authorization: FC = () => {
  const { loading, error, userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo.token) navigate("/dashboard");
  }, [navigate, userInfo]);
  const handleSubmit = (data: ILoginData) => {
    console.log(data);
    dispatch(userLogin(data) as any);
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
