import { FC } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import {
  Input,
  CheckBox,
  Button,
  CustomLink,
  Notification,
} from "../../../components/ui";
import {
  IRegisterFormInput,
  IRegisterFormProps,
} from "./RegisterForm.interfaces";
import styles from "./RegisterForm.module.css";

const RegisterForm: FC<IRegisterFormProps> = ({ onSubmit, loading, error }) => {
  const { registerFormStyles, registerFormHeader } = styles;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const password = watch("password", "");

  const minLengthForLogin = 4;
  const maxLengthForLogin = 20;

  const allowedCharactersForLogin = /^[a-zA-Z0-9]+$/;

  const minLengthForPassword = 8;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]+$/;

  const submitHandler: SubmitHandler<IRegisterFormInput> = (data) => {
    const { confirmPassword, agreement, ...formData } = data;
    onSubmit(formData);
  };

  const submitError: SubmitErrorHandler<IRegisterFormInput> = (data) => {
    /* console.log("Errors", data); */
  };

  return (
    <>
      {error && <Notification message={error} />}
      <h2 className={registerFormHeader}>Sing Up</h2>
      <form
        onSubmit={handleSubmit(submitHandler, submitError)}
        className={registerFormStyles}
      >
        <Input
          inputFieldType='text'
          label='Name'
          {...register("userName", {
            required: { value: true, message: "Name is required" },
          })}
          errorMessage={errors.userName?.message}
        ></Input>
        <Input
          inputFieldType='text'
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
          errorMessage={errors.login?.message}
        ></Input>
        <Input
          inputFieldType='password'
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
          errorMessage={errors.password?.message}
        ></Input>
        <Input
          inputFieldType='password'
          label='Enter your password again'
          {...register("confirmPassword", {
            required: { value: true, message: "Password is required" },
            validate: (value) => value === password || "Passwords do not match",
          })}
          errorMessage={errors.confirmPassword?.message}
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
