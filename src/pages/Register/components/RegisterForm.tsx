import { FC } from "react";
import { RegisterFormInput, RegisterFormProps } from "./RegisterForm.types";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import Input from "../../../ui/Input/Input";
import CheckBox from "../../../ui/CheckBox/CheckBox";
import Button from "../../../ui/Button/Button";
import CustomLink from "../../../ui/CustomLink/CustomLink";
import styles from "./RegisterForm.module.css";
const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, loading }) => {
  const { registerFormStyles, registerFormHeader } = styles;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInput>();

  const submitHandler: SubmitHandler<RegisterFormInput> = (data) => {
    const { confirmPassword, agreement, ...formData } = data;
    onSubmit(formData);
  };

  const submitError: SubmitErrorHandler<RegisterFormInput> = (data) => {
    console.log("Errors", data);
  };

  const password = watch("password", "");

  const minLengthForLogin = 4;
  const maxLengthForLogin = 20;

  const allowedCharactersForLogin = /^[a-zA-Z0-9]+$/;

  const minLengthForPassword = 8;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  return (
    <>
      <h2 className={registerFormHeader}>Sing Up</h2>
      <form
        onSubmit={handleSubmit(submitHandler, submitError)}
        className={registerFormStyles}
      >
        <Input
          inputType='text'
          label='Name'
          {...register("userName", {
            required: { value: true, message: "Name is required" },
          })}
          inputErrorMessage={errors.userName?.message}
        ></Input>
        <Input
          inputType='text'
          label='Login'
          {...register("login", {
            required: { value: true, message: "Login is required" },
            minLength: {
              value: minLengthForLogin,
              message: `Login must be at least ${minLengthForLogin} characters`,
            },
            maxLength: {
              value: maxLengthForLogin,
              message: `Login must not exceed ${maxLengthForLogin} characters`,
            },
            pattern: {
              value: allowedCharactersForLogin,
              message: "Login must only contain alphanumeric characters",
            },
          })}
          inputErrorMessage={errors.login?.message}
        ></Input>
        <Input
          inputType='password'
          label='Password'
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: {
              value: minLengthForPassword,
              message: `Password must be at least ${minLengthForPassword} characters`,
            },
            pattern: {
              value: passwordRegex,
              message:
                "Password must contain a combination of uppercase and lowercase letters, numbers, and special characters",
            },
          })}
          inputErrorMessage={errors.password?.message}
        ></Input>
        <Input
          inputType='password'
          label='Enter your password again'
          {...register("confirmPassword", {
            required: { value: true, message: "Password is required" },
            validate: (value) => value === password || "Passwords do not match",
          })}
          inputErrorMessage={errors.confirmPassword?.message}
        ></Input>
        <CheckBox
          text='I accept the agreement'
          {...register("agreement", {
            required: {
              value: true,
              message: "You must be accept the agreement.",
            },
          })}
          errorText={errors.agreement?.message}
        ></CheckBox>

        <Button
          text={loading ? "Singing Up..." : "Sing Up"}
          variant='primary'
        ></Button>
        <CustomLink
          labelLink='Sing In'
          text='Already a member?'
          link='/login'
        />
      </form>
    </>
  );
};

export default RegisterForm;
