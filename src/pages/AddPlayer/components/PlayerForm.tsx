import { FC, useEffect, useState } from "react";
import {
  IPlayerFormInputs,
  IPlayerFormProps,
  InitialDefaults,
  ITeamsOptions,
  IPositionsOptions,
} from "./IPlayerFormProps";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import Notification from "../../../ui/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayer } from "../../../core/redux/slices/player/playerSlice";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import styles from "./PlayerForm.module.css";
import Input from "../../../ui/Input/Input";
import ItemsSelector from "../../../ui/ItemsSelector/ItemsSelector";
import { selectTeams } from "../../../core/redux/slices/team/teamSlice";
import Button from "../../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { getPositionsWithSpaces } from "../../../api/additionalRequests";
import { RootState } from "../../../core/redux/store";
import { jsonDateToString } from "../../../utils/stringFunctions";
import {
  AllTeamActions,
  getTeams,
} from "../../../core/redux/slices/team/teamActions";
import { ThunkDispatch } from "@reduxjs/toolkit";

const PlayerForm: FC<IPlayerFormProps> = ({
  onSubmit,
  edit = false,
  loading,
  error,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [playerPositions, setPlayerPositions] = useState<
    Array<IPositionsOptions> | undefined
  >(undefined);
  const [teamsOptions, setTeamsOptions] = useState<
    Array<ITeamsOptions> | undefined
  >(undefined);
  const [playerCurrentPosition, setPlayerCurrentPosition] = useState<
    number | undefined
  >(undefined);
  const [playerCurrentTeam, setPlayerCurrentTeam] = useState<
    number | undefined
  >(undefined);
  const {
    playerFormContainer,
    fieldsContainer,
    playerInfoStyles,
    inputWrapper,
    buttonsContainer,
    imageUploader,
  } = styles;

  const dispatchTeam: ThunkDispatch<RootState, void, AllTeamActions> =
    useDispatch();
  const navigate = useNavigate();

  const teams = useSelector(selectTeams);
  const player = useSelector(selectPlayer);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPositionsWithSpaces(userInfo.token);
        setPlayerPositions(data);
        const index = data.findIndex((obj: IPositionsOptions) => {
          return obj.value === player?.position;
        });
        setPlayerCurrentPosition(index);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userInfo.token, player?.position]);
  useEffect(() => {
    if (teams.length === 0) {
      dispatchTeam(getTeams({}));
    }
    if (teams.length !== 0) {
      const options: Array<ITeamsOptions> = teams?.map((team) => ({
        value: team.id,
        label: team.name,
      }));
      const index = options.findIndex((obj: ITeamsOptions) => {
        return obj.value === player?.team;
      });

      setPlayerCurrentTeam(index);

      setTeamsOptions(options);
    }
  }, [player?.position, player?.team, teams, dispatchTeam]);

  const initialPlayer: InitialDefaults = {
    name: player && player.name,
    number: player && player.number,
    position: player && player.position,
    team: player && Number(player.team),
    birthday: player && jsonDateToString(player.birthday),
    height: player && player.height,
    weight: player && player.weight,
    avatarUrl: player && player.avatarUrl,
    file_img: undefined,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPlayerFormInputs>({ defaultValues: initialPlayer });
  const submitHandler: SubmitHandler<IPlayerFormInputs> = (
    data: IPlayerFormInputs
  ) => {
    onSubmit(data);
  };
  const submitError: SubmitErrorHandler<IPlayerFormInputs> = (data) => {
    /*  console.log("Errors", data); */
  };
  return (
    <>
      {error && <Notification message={error} positionCenter />}
      {playerPositions && teamsOptions && (
        <form
          className={playerFormContainer}
          onSubmit={handleSubmit(submitHandler, submitError)}
        >
          <div className={imageUploader}>
            {edit ? (
              <ImageUpload
                edit
                imageUrl={initialPlayer.avatarUrl}
                {...register("avatarUrl", {
                  required: { value: true, message: "Image is required" },
                })}
                setValueForPlayer={setValue}
              />
            ) : (
              <ImageUpload
                {...register("file_img", {
                  required: { value: true, message: "Image is required" },
                })}
                setValueForPlayer={setValue}
                needMessage
                errorMessage={errors.file_img?.message}
              />
            )}
          </div>
          <div className={fieldsContainer}>
            <Input
              inputType='text'
              label='Name'
              {...register("name", {
                required: { value: true, message: "Name is required" },
              })}
              inputErrorMessage={errors.name?.message}
            />

            {edit ? (
              <>
                <ItemsSelector
                  defaultValueIndex={playerCurrentPosition}
                  forForm
                  textPosition='left'
                  label='Position'
                  options={playerPositions}
                  handleChange={(option) =>
                    setValue("position", String(option?.value) ?? undefined)
                  }
                  selectErrorMessage={errors.position?.message}
                  isClearable
                  {...register("position", {
                    required: { value: true, message: "Position is required" },
                  })}
                />

                <ItemsSelector
                  defaultValueIndex={playerCurrentTeam}
                  forForm
                  textPosition='left'
                  label='Team'
                  isDisabled
                  options={teamsOptions && teamsOptions}
                  handleChange={(option) =>
                    setValue("team", Number(option?.value) ?? undefined)
                  }
                  selectErrorMessage={errors.team?.message}
                  isClearable
                  {...register("team", {
                    required: { value: true, message: "Team is required" },
                  })}
                />
              </>
            ) : (
              <>
                <ItemsSelector
                  forForm
                  textPosition='left'
                  label='Position'
                  options={playerPositions}
                  handleChange={(option) =>
                    setValue("position", String(option?.value) ?? undefined)
                  }
                  selectErrorMessage={errors.position?.message}
                  isClearable
                  {...register("position", {
                    required: { value: true, message: "Position is required" },
                  })}
                />
                <ItemsSelector
                  forForm
                  textPosition='left'
                  label='Team'
                  options={teamsOptions}
                  handleChange={(option) =>
                    setValue("team", Number(option?.value) ?? undefined)
                  }
                  selectErrorMessage={errors.team?.message}
                  isClearable
                  {...register("team", {
                    required: { value: true, message: "Team is required" },
                  })}
                />
              </>
            )}
            <div className={playerInfoStyles}>
              <div className={inputWrapper}>
                <Input
                  inputType='number'
                  label='Height (cm)'
                  {...register("height", {
                    required: { value: true, message: "Height is required" },
                    min: {
                      value: 180,
                      message: "Greater than or equal to 180",
                    },
                  })}
                  inputErrorMessage={errors.height?.message}
                />
              </div>
              <div className={inputWrapper}>
                <Input
                  inputType='number'
                  label='Weight (kg)'
                  {...register("weight", {
                    required: { value: true, message: "Weight is required" },
                    min: {
                      value: 70,
                      message: "Greater than or equal to 70",
                    },
                  })}
                  inputErrorMessage={errors.weight?.message}
                />
              </div>
              <div className={inputWrapper}>
                <Input
                  inputType='date'
                  label='Birthday'
                  {...register("birthday", {
                    required: { value: true, message: "Birthday is required" },
                    validate: (value) => {
                      const currentDate = new Date();
                      const selectedDate = new Date(value);

                      if (isNaN(selectedDate.getTime())) {
                        return "Invalid birthday date";
                      }
                      const age =
                        currentDate.getFullYear() - selectedDate.getFullYear();

                      if (age < 18) {
                        return "At least 18 years old";
                      }
                      if (age > 100) {
                        return "Older than 100 years";
                      }
                      return true;
                    },
                  })}
                  inputErrorMessage={errors.birthday?.message}
                />
              </div>
              <div className={inputWrapper}>
                <Input
                  inputType='number'
                  label='Number'
                  {...register("number", {
                    required: { value: true, message: "Number is required" },
                    min: {
                      value: 0,
                      message: "Greater than or equal to 0",
                    },
                    max: {
                      value: 99,
                      message: "Less than or equal to 99",
                    },
                  })}
                  inputErrorMessage={errors.number?.message}
                />
              </div>
            </div>
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
      )}
    </>
  );
};

export default PlayerForm;
