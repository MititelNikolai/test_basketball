import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormInput, LoginFormProps } from "./LoginForm.types";
import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import styles from "./LoginForm.module.css";
import CustomLink from "../../../ui/CustomLink/CustomLink";
import Notification from "../../../ui/Notification/Notification";
const LoginForm: FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  const { loginFormHeader, loginFormStyles } = styles;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const submitHandler: SubmitHandler<LoginFormInput> = (data) => {
    onSubmit(data);
  };

  return (
    <>
      {error && <Notification error={error} />}
      <h2 className={loginFormHeader}>Sing In</h2>
      <form className={loginFormStyles} onSubmit={handleSubmit(submitHandler)}>
        <Input
          label='Login'
          inputType='text'
          inputErrorMessage={errors.login?.message}
          {...register("login", {
            required: { value: true, message: "Login is required" },
          })}
        ></Input>
        <Input
          label='Password'
          inputType='password'
          inputErrorMessage={errors.password?.message}
          {...register("password", {
            required: { value: true, message: "Password is required" },
          })}
        ></Input>
        <Button
          type='submit'
          text={loading ? "Singing In..." : "Sing In"}
          variant='primary'
        ></Button>
        <CustomLink
          labelLink='Sing Up'
          text='Not a member yet?'
          link='/register'
        />
      </form>
    </>
  );
};

export default LoginForm;
