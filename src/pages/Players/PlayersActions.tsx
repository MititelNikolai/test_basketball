import { FC, useEffect, useState } from "react";
import Input from "../../ui/Input/Input";
import IconDelete from "../../ui/icons/IconDelete";
import IconSearch from "../../ui/icons/IconSearch";
import { NavLink } from "react-router-dom";
import Button from "../../ui/Button/Button";
import styles from "./Players.module.css";
import PlayerMultiSelect from "./components/PlayerMultiSelect/PlayerMultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../core/redux/slices/team/teamActions";
import { selectTeams } from "../../core/redux/slices/team/teamSlice";
import { SelectOptions } from "./components/PlayerMultiSelect/IPlayerMultiSelect";

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
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const [filterOptions, setFilterOptions] = useState<
    Array<SelectOptions> | undefined
  >();
  const teams = useSelector(selectTeams);

  useEffect(() => {
    dispatch(getTeams({}) as any);
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
              ? () => {
                  filterName(search);
                }
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
            filterTeams(option);
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
