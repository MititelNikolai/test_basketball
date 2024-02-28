import { FC, useEffect, useState } from "react";
import Input from "../../ui/Input/Input";
import IconDelete from "../../ui/icons/IconDelete";
import IconSearch from "../../ui/icons/IconSearch";
import { NavLink } from "react-router-dom";
import Button from "../../ui/Button/Button";
import styles from "./Players.module.css";
import PlayerMultiSelect from "./components/PlayerMultiSelect/PlayerMultiSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  AllTeamActions,
  getTeams,
} from "../../core/redux/slices/team/teamActions";
import { selectTeams } from "../../core/redux/slices/team/teamSlice";
import { SelectOptions } from "./components/PlayerMultiSelect/IPlayerMultiSelect";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../core/redux/store";

interface ITeamActions {
  filterName: (search: string) => void;
  filterTeams: (selected: Array<SelectOptions>) => void;
  resetAction: () => void;
  inSearch: boolean;
  searchTeam: Array<SelectOptions> | undefined;
}

const PlayersActions: FC<ITeamActions> = ({
  filterName,
  filterTeams,
  resetAction,
  inSearch,
  searchTeam,
}) => {
  const { actionsContainer, actionWrapper } = styles;
  const dispatch: ThunkDispatch<RootState, void, AllTeamActions> =
    useDispatch();
  const [search, setSearch] = useState("");

  const [filterOptions, setFilterOptions] = useState<
    Array<SelectOptions> | undefined
  >();
  const teams = useSelector(selectTeams);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterName(search);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [search, filterName]);
  useEffect(() => {
    dispatch(getTeams({}));
  }, [dispatch]);
  useEffect(() => {
    teams.length !== 0 &&
      setFilterOptions(
        teams.map((team) => {
          return {
            value: team.id,
            label: team.name,
          };
        })
      );
  }, [teams]);
  return (
    <div className={actionsContainer}>
      <div className={actionWrapper}>
        <Input
          handleClick={
            !inSearch
              ? () => {}
              : () => {
                  setSearch("");
                  resetAction();
                }
          }
          setValue={setSearch}
          value={search}
          inputType='text'
          placeholder='Search...'
          background='white'
          needMessage={false}
        >
          {inSearch ? <IconDelete /> : <IconSearch />}
        </Input>
        <PlayerMultiSelect
          selectedValues={searchTeam}
          options={filterOptions}
          handleChange={(option) => {
            filterTeams(option ? option.slice() : []);
          }}
        />
      </div>

      <NavLink to='./add-player'>
        <div className={actionWrapper}>
          <Button variant='primary' text='Add' textWithPlus />
        </div>
      </NavLink>
    </div>
  );
};

export default PlayersActions;
