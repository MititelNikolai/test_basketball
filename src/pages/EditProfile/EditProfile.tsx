import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../core/redux/slices/auth/authActions";
import {
  resetSuccess,
  selectAuthStatus,
} from "../../core/redux/slices/auth/authSlice";
import { IUser } from "../../core/redux/slices/auth/auth.interfaces";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { Breadcrumbs, ImageUpload } from "../../components";
import { Input, Button } from "../../components/ui";
import EditUser from "./EditUser.interfaces";
import styles from "./EditProfile.module.css";

const EditProfile: FC = () => {
  const {
    editProfileContainer,
    imageUploader,
    fieldsContainer,
    buttonsContainer,
  } = styles;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchUser = useTypedDispatch();
  const { loading, success } = useSelector(selectAuthStatus);
  let userData: IUser | null = null;
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData) {
    userData = JSON.parse(storedUserData);
  }

  const user: EditUser = {
    userName: userData && userData.name,
    avatarUrl: userData && userData.avatarUrl,
    file_img: undefined,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUser>({ defaultValues: user });

  const submitHandler: SubmitHandler<EditUser> = async (data: EditUser) => {
    const { avatarUrl, userName, file_img } = data;
    const dataToServer: {
      userName?: string;
      avatarUrl?: string;
    } = {
      userName: (userName && userName.trim()) || undefined,
      avatarUrl:
        (file_img &&
          (await uploadImageToServer(file_img, userData && userData.token))) ||
        avatarUrl,
    };
    dispatchUser(userUpdate(dataToServer));
  };

  const submitError: SubmitErrorHandler<EditUser> = (data) => {
    /*  console.log("Errors", data); */
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("/teams");
    }
  }, [navigate, dispatch, success]);

  return (
    <>
      <Breadcrumbs pathname={location.pathname} />
      <section>
        <form
          className={editProfileContainer}
          onSubmit={handleSubmit(submitHandler, submitError)}
        >
          <div className={imageUploader}>
            <ImageUpload
              edit
              imageUrl={user.avatarUrl !== null ? user.avatarUrl : undefined}
              {...register("avatarUrl", {
                required: { value: true, message: "Image is required" },
              })}
              setValueForUser={setValue}
              haveMessage
              errorMessage={errors.file_img?.message}
            />
          </div>
          <div className={fieldsContainer}>
            <Input
              inputFieldType='text'
              label='User Name'
              {...register("userName", {
                required: { value: false, message: "Name is required" },
              })}
              errorMessage={errors.userName?.message}
            />

            <div className={buttonsContainer}>
              <Button
                variant='secondary'
                text='Cancel'
                type='button'
                handleClick={() => {
                  navigate(-1);
                }}
              />
              <Button
                variant='primary'
                text={loading ? "Saving..." : "Save"}
                type='submit'
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProfile;
