import { FC } from "react";
import styles from "./AddTeamForm.module.css";
import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { AddTeamFormProps, IAddFormInputs } from "./IAddFormInputs";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
const AddTeamForm: FC<AddTeamFormProps> = ({ onSubmit }) => {
  const { fieldsContainer, addTeamFormContainer, buttonsContainer } = styles;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAddFormInputs>();

  const submitHandler: SubmitHandler<IAddFormInputs> = (
    data: IAddFormInputs
  ) => {
    onSubmit(data);
  };

  const submitError: SubmitErrorHandler<IAddFormInputs> = (data) => {
    console.log("Errors", data);
  };

  return (
    <form
      className={addTeamFormContainer}
      onSubmit={handleSubmit(submitHandler, submitError)}
    >
      <ImageUpload
        {...register("file_img", {
          required: { value: true, message: "Image is required" },
        })}
        setValue={setValue}
      />
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
          <Button variant='secondary' text='Cancel' type='button' />
          <Button variant='primary' text='Save' type='submit' />
        </div>
      </div>
    </form>
  );
};

export default AddTeamForm;
