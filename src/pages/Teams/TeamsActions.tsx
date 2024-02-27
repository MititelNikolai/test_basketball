import { FC, useEffect, useState } from "react";
import Input from "../../ui/Input/Input";
import IconSearch from "../../ui/icons/IconSearch";
import Button from "../../ui/Button/Button";
import styles from "./Teams.module.css";
import { NavLink } from "react-router-dom";
import IconDelete from "../../ui/icons/IconDelete";

interface ITeamActions {
  filter: (search: string) => void;
  resetAction: () => void;
  inSearch: boolean;
}

const TeamsActions: FC<ITeamActions> = ({ filter, resetAction, inSearch }) => {
  const { actionsContainer, actionWrapper } = styles;
  const [search, setSearch] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filter(search);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [search, filter]);
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
          placeholder='Search by name...'
          background='white'
          needMessage={false}
        >
          {inSearch ? <IconDelete /> : <IconSearch />}
        </Input>
      </div>

      <NavLink to='./add-team'>
        <div className={actionWrapper}>
          <Button variant='primary' text='Add' textWithPlus />
        </div>
      </NavLink>
    </div>
  );
};

export default TeamsActions;
