import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Input, Button } from "../../components/ui";
import { IconSearch, IconDelete } from "../../components/ui/icons";
import styles from "./Teams.module.css";
import TeamActionsProps from "./TeamActionsProps";

const TeamsActions: FC<TeamActionsProps> = ({
  filter,
  resetAction,
  inSearch,
}) => {
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
          inputFieldType='text'
          placeholder='Search by name...'
          background='white'
          haveMessage={false}
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
