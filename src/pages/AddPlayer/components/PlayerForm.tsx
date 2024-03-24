import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  selectPlayer,
  selectPositions,
} from "../../../core/redux/slices/player/playerSlice";
import {
  getNumberOfTeams,
  selectTeams,
} from "../../../core/redux/slices/team/teamSlice";
import { getTeams } from "../../../core/redux/slices/team/teamActions";
import { getPositions } from "../../../core/redux/slices/player/playerAction";
import {
  addSpaceBeforeUppercase,
  jsonDateToString,
} from "../../../utils/stringFunctions";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import {
  PlayerFormInputs,
  PlayerFormProps,
  InitialDefaults,
  TeamsOptions,
  PositionsOptions,
} from "./PlayerForm.interfaces";
import {
  Notification,
  ItemsSelector,
  Button,
  Input,
} from "../../../components/ui";
import { ImageUpload } from "../../../components";
import styles from "./PlayerForm.module.css";

const PlayerForm: FC<PlayerFormProps> = ({
  onSubmit,
  edit = false,
  loading,
  error,
}) => {
  const {
    playerFormContainer,
    fieldsContainer,
    playerInfoStyles,
    inputWrapper,
    buttonsContainer,
    imageUploader,
  } = styles;

  const [playerCurrentTeam, setPlayerCurrentTeam] = useState<
    number | undefined
  >(undefined);
  const [teamsOptions, setTeamsOptions] = useState<
    Array<TeamsOptions> | undefined
  >(undefined);
  const [playerPositionOptions, setPlayerPositionOptions] = useState<
    Array<PositionsOptions> | undefined
  >(undefined);
  const [playerCurrentPosition, setPlayerCurrentPosition] = useState<
    number | undefined
  >(undefined);

  const dispatchTeam = useTypedDispatch();
  const dispatchPositions = useTypedDispatch();
  const navigate = useNavigate();

  const teams = useSelector(selectTeams);
  const positions = useSelector(selectPositions);
  const player = useSelector(selectPlayer);
  const teamCount = useSelector(getNumberOfTeams);

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
    clearErrors,
    formState: { errors },
  } = useForm<PlayerFormInputs>({ defaultValues: initialPlayer });

  const submitHandler: SubmitHandler<PlayerFormInputs> = (
    data: PlayerFormInputs
  ) => {
    onSubmit(data);
  };

  const submitError: SubmitErrorHandler<PlayerFormInputs> = (data) => {
    /*  console.log("Errors", data); */
  };

  useEffect(() => {
    if (!positions) {
      dispatchPositions(getPositions());
    }
    if (positions && positions.length !== 0) {
      const options: Array<PositionsOptions> = positions.map(
        (position: string) => ({
          label: addSpaceBeforeUppercase(position),
          value: position,
        })
      );
      const index = options.findIndex((obj: PositionsOptions) => {
        return obj.value === player?.position;
      });
      setPlayerCurrentPosition(index);
      setPlayerPositionOptions(options);
    }
  }, [dispatchPositions, player?.position, positions]);

  useEffect(() => {
    if (teamCount !== 0) {
      if (teams.length === 0) {
        dispatchTeam(getTeams({}));
      }
      if (teams.length !== 0) {
        const options: Array<TeamsOptions> = teams?.map((team) => ({
          value: team.id,
          label: team.name,
        }));
        const index = options.findIndex((obj: TeamsOptions) => {
          return obj.value === player?.team;
        });

        setPlayerCurrentTeam(index);

        setTeamsOptions(options);
      }
    }
  }, [player?.position, player?.team, teams, dispatchTeam, teamCount]);

  return (
    <>
      {error && <Notification message={error} positionCenter />}
      {playerPositionOptions && (
        <form
          className={playerFormContainer}
          onSubmit={handleSubmit(submitHandler, submitError)}
        >
          <div className={imageUploader}>
            <ImageUpload
              imageUrl={initialPlayer.avatarUrl}
              {...register("file_img", {
                required: { value: !edit, message: "Image is required" },
              })}
              setValueForPlayer={setValue}
              errorMessage={errors.file_img?.message}
              clearError={() => clearErrors("file_img")}
            />
          </div>
          <div className={fieldsContainer}>
            <Input
              type='text'
              label='Name'
              {...register("name", {
                required: { value: true, message: "Name is required" },
              })}
              errorMessage={errors.name?.message}
            />

            {edit ? (
              <>
                <ItemsSelector
                  defaultValueIndex={playerCurrentPosition}
                  forForm
                  textPosition='left'
                  label='Position'
                  options={playerPositionOptions}
                  handleChange={(option) => {
                    setValue("position", String(option?.value) ?? undefined);
                    clearErrors("position");
                  }}
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
            ) : (
              <>
                <ItemsSelector
                  forForm
                  textPosition='left'
                  label='Position'
                  options={playerPositionOptions}
                  handleChange={(option) => {
                    setValue(
                      "position",
                      option?.value !== undefined ? String(option?.value) : ""
                    );
                    clearErrors("position");
                  }}
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
                  handleChange={(option) => {
                    setValue("team", Number(option?.value) ?? undefined);
                    clearErrors("team");
                  }}
                  selectErrorMessage={errors.team?.message}
                  {...register("team", {
                    required: { value: true, message: "Team is required" },
                  })}
                />
              </>
            )}
            <div className={playerInfoStyles}>
              <div className={inputWrapper}>
                <Input
                  type='number'
                  label='Height (cm)'
                  {...register("height", {
                    required: { value: true, message: "Height is required" },
                    min: {
                      value: 180,
                      message: "Greater than or equal to 180",
                    },
                  })}
                  errorMessage={errors.height?.message}
                />
              </div>
              <div className={inputWrapper}>
                <Input
                  type='number'
                  label='Weight (kg)'
                  {...register("weight", {
                    required: { value: true, message: "Weight is required" },
                    min: {
                      value: 70,
                      message: "Greater than or equal to 70",
                    },
                  })}
                  errorMessage={errors.weight?.message}
                />
              </div>
              <div className={inputWrapper}>
                <Input
                  type='date'
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
                  errorMessage={errors.birthday?.message}
                />
              </div>
              <div className={inputWrapper}>
                <Input
                  type='number'
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
                  errorMessage={errors.number?.message}
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
