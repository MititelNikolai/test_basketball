import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../core/redux/slices/auth/authActions";
import {
  resetSuccess,
  selectAuthStatus,
  updateProfile,
  resetError,
  setProfileError,
} from "../../core/redux/slices/auth/authSlice";
import { User } from "../../core/redux/slices/auth/auth.interfaces";
import uploadImageToServer from "../../core/api/uploadImageToServer";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useImageCompression } from "../../hooks/useImageCompression";
import { Breadcrumbs, ImageUpload } from "../../components";
import { Input, Button, Notification } from "../../components/ui";
import { EditUser } from "./EditUser.interfaces";
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
  const compress = useImageCompression(350, 350);

  const { loading, success, error } = useSelector(selectAuthStatus);

  const dispatch = useDispatch();
  const dispatchUser = useTypedDispatch();

  let userData: User | null = null;

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
    clearErrors,
    formState: { errors },
  } = useForm<EditUser>({ defaultValues: user });

  const submitHandler: SubmitHandler<EditUser> = async (data: EditUser) => {
    const { avatarUrl, userName, file_img } = data;

    const dataToServer: {
      userName?: string;
      avatarUrl?: string;
    } = {
      userName: (userName && userName.trim()) || undefined,
      avatarUrl: file_img
        ? await uploadImageToServer(await compress(file_img))
        : avatarUrl,
    };

    if (dataToServer.avatarUrl) {
      dispatchUser(userUpdate(dataToServer));
      dispatch(updateProfile(dataToServer));
    } else {
      dispatch(setProfileError("Failed to upload Image"));
    }
  };

  const submitError: SubmitErrorHandler<EditUser> = (data) => {
    /*  console.log("Errors", data); */
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetError());
      }, 3100);
    }
    if (success) {
      dispatch(resetSuccess());
      navigate("/teams");
    }
  }, [navigate, dispatch, success, error]);

  return (
    <>
      {error && <Notification message={error} positionCenter />}
      <Breadcrumbs pathname={location.pathname} />
      <section>
        <form
          className={editProfileContainer}
          onSubmit={handleSubmit(submitHandler, submitError)}
        >
          <div className={imageUploader}>
            <ImageUpload
              imageUrl={user.avatarUrl === null ? undefined : user.avatarUrl}
              {...register("file_img", {
                required: {
                  value: !user.avatarUrl,
                  message: "Image is required",
                },
              })}
              setValueForUser={setValue}
              errorMessage={errors.file_img?.message}
              clearError={() => clearErrors("file_img")}
            />
          </div>
          <div className={fieldsContainer}>
            <Input
              type='text'
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
