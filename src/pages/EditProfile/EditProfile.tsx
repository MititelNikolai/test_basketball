import { FC, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditProfile.module.css";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { RootState } from "../../core/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { IUser } from "../../core/redux/slices/auth/auth.types";
import uploadImageToServer from "../../api/imageRequests/uploadImageToServer";
import { userUpdate } from "../../core/redux/slices/auth/authActions";
import { resetSuccess } from "../../core/redux/slices/auth/authSlice";
export interface IEditUser {
  userName: string | null;
  avatarUrl: string | null;
  file_img: File | undefined;
}
export interface IEditUserToServer {
  userName?: string;
  avatarUrl?: string;
}
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
  const { loading, success } = useSelector((state: RootState) => state.auth);
  let userData: IUser | null = null;
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    userData = JSON.parse(storedUserData);
    console.log(userData);
  }

  const user: IEditUser = {
    userName: userData && userData.name,
    avatarUrl: userData && userData.avatarUrl,
    file_img: undefined,
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditUser>({ defaultValues: user });

  const submitHandler: SubmitHandler<IEditUser> = async (data: IEditUser) => {
    const { avatarUrl, userName, file_img } = data;
    console.log(userData && userData.token);
    const dataToServer: IEditUserToServer = {
      userName: (userName && userName.trim()) || undefined,
      avatarUrl:
        (file_img &&
          (await uploadImageToServer(file_img, userData && userData.token))) ||
        avatarUrl,
    };
    dispatch(userUpdate(dataToServer) as any);
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("/teams");
    }
  }, [navigate, dispatch, success]);

  const submitError: SubmitErrorHandler<IEditUser> = (data) => {
    console.log("Errors", data);
  };
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
              needMessage
              errorMessage={errors.file_img?.message}
            />
          </div>
          <div className={fieldsContainer}>
            <Input
              inputType='text'
              label='User Name'
              {...register("userName", {
                required: { value: false, message: "Name is required" },
              })}
              inputErrorMessage={errors.userName?.message}
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
