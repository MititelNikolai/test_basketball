import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeams } from "../../core/redux/slices/team/teamActions";
import { selectTeams } from "../../core/redux/slices/team/teamSlice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { Input, Button } from "../../components/ui";
import { IconDelete, IconSearch } from "../../components/ui/icons";
import PlayerMultiSelect from "./components/PlayerMultiSelect/PlayerMultiSelect";
import { SelectOptions } from "./components/PlayerMultiSelect/PlayerMultiSelect.interfaces";
import { PlayersActionsProps } from "./Players.interfaces";
import styles from "./Players.module.css";

const PlayersActions: FC<PlayersActionsProps> = ({
  filterName,
  filterTeams,
  resetAction,
  inSearch,
  searchTeam,
}) => {
  const { actionsContainer, actionWrapper } = styles;

  const [search, setSearch] = useState("");
  const [filterOptions, setFilterOptions] = useState<
    Array<SelectOptions> | undefined
  >();

  const teams = useSelector(selectTeams);

  const dispatchTeams = useTypedDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterName(search);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [search, filterName]);

  useEffect(() => {
    dispatchTeams(getTeams({}));
  }, [dispatchTeams]);

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
          type='text'
          placeholder='Search...'
          background='white'
          haveMessage={false}
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
