import { FC } from "react";
import styles from "./TeamForm.module.css";
import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { useNavigate } from "react-router-dom";
import {
  TeamFormProps,
  ITeamFormInputs,
  InitialDefaults,
} from "./ITeamFormInputs";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectTeam } from "../../../core/redux/slices/team/teamSlice";

const TeamForm: FC<TeamFormProps> = ({ onSubmit, loading, edit = false }) => {
  const { fieldsContainer, teamFormContainer, buttonsContainer } = styles;
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
    formState: { errors },
  } = useForm<ITeamFormInputs>({ defaultValues: initialTeam });
  const submitHandler: SubmitHandler<ITeamFormInputs> = (
    data: ITeamFormInputs
  ) => {
    onSubmit(data);
  };

  const submitError: SubmitErrorHandler<ITeamFormInputs> = (data) => {
    console.log("Errors", data);
  };

  return (
    <form
      className={teamFormContainer}
      onSubmit={handleSubmit(submitHandler, submitError)}
    >
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
        />
      )}
      <div className={fieldsContainer}>
        <Input
          inputType='text'
          label='Name'
          {...register("name", {
            required: { value: true, message: "Name is required" },
          })}
          inputErrorMessage={errors.name?.message}
        />
        <Input
          inputType='text'
          label='Division'
          {...register("division", {
            required: { value: true, message: "Division is required" },
          })}
          inputErrorMessage={errors.division?.message}
        />
        <Input
          inputType='text'
          label='Conference'
          {...register("conference", {
            required: { value: true, message: "Conference is required" },
          })}
          inputErrorMessage={errors.conference?.message}
        />
        <Input
          inputType='number'
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
          inputErrorMessage={errors.foundationYear?.message}
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
  );
};

export default TeamForm;
