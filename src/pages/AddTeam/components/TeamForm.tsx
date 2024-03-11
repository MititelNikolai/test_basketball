import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectTeam } from "../../../core/redux/slices/team/teamSlice";
import { Input, Button, Notification } from "../../../components/ui";
import { ImageUpload } from "../../../components";
import {
  TeamFormProps,
  ITeamFormInputs,
  InitialDefaults,
} from "./TeamForm.interfaces";
import styles from "./TeamForm.module.css";

const TeamForm: FC<TeamFormProps> = ({
  onSubmit,
  loading,
  edit = false,
  error,
}) => {
  const {
    fieldsContainer,
    teamFormContainer,
    buttonsContainer,
    imageUploader,
  } = styles;

  const navigate = useNavigate();
  const team = useSelector(selectTeam);

  const initialTeam: InitialDefaults = {
    name: team && team.name,
    division: team && team.division,
    conference: team && team.conference,
    foundationYear: team && String(team.foundationYear),
    imageUrl: team && team.imageUrl,
    file_img: undefined,
  };
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ITeamFormInputs>({ defaultValues: initialTeam });

  const submitHandler: SubmitHandler<ITeamFormInputs> = (
    data: ITeamFormInputs
  ) => {
    onSubmit(data);
  };

  const submitError: SubmitErrorHandler<ITeamFormInputs> = (data) => {
    /*   console.log("Errors", data); */
  };
  return (
    <>
      {error && <Notification message={error} positionCenter />}

      <form
        className={teamFormContainer}
        onSubmit={handleSubmit(submitHandler, submitError)}
      >
        <div className={imageUploader}>
          {edit ? (
            <ImageUpload
              edit
              imageUrl={initialTeam.imageUrl}
              {...register("imageUrl", {
                required: { value: true, message: "Image is required" },
              })}
              setValueForTeam={setValue}
            />
          ) : (
            <ImageUpload
              {...register("file_img", {
                required: { value: true, message: "Image is required" },
              })}
              setValueForTeam={setValue}
              haveMessage
              errorMessage={errors.file_img?.message}
              clearError={() => clearErrors("file_img")}
            />
          )}
        </div>
        <div className={fieldsContainer}>
          <Input
            inputFieldType='text'
            label='Name'
            {...register("name", {
              required: { value: true, message: "Name is required" },
            })}
            errorMessage={errors.name?.message}
          />
          <Input
            inputFieldType='text'
            label='Division'
            {...register("division", {
              required: { value: true, message: "Division is required" },
            })}
            errorMessage={errors.division?.message}
          />
          <Input
            inputFieldType='text'
            label='Conference'
            {...register("conference", {
              required: { value: true, message: "Conference is required" },
            })}
            errorMessage={errors.conference?.message}
          />
          <Input
            inputFieldType='number'
            label='Year of foundation'
            {...register("foundationYear", {
              required: {
                value: true,
                message: "Year of foundation is required",
              },
              min: {
                value: 1900,
                message: "Foundation Year must be at least 1900",
              },
              max: {
                value: new Date().getFullYear(),
                message: `Foundation Year cannot be in the future`,
              },
            })}
            errorMessage={errors.foundationYear?.message}
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
    </>
  );
};

export default TeamForm;
