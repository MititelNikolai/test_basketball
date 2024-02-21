import { FC, useState } from "react";
import Input from "../../ui/Input/Input";
import IconDelete from "../../ui/icons/IconDelete";
import IconSearch from "../../ui/icons/IconSearch";
import { NavLink } from "react-router-dom";
import Button from "../../ui/Button/Button";
import styles from "./Players.module.css";

interface ITeamActions {
  filter: (search: string) => void;
  resetAction: () => void;
  inSearch: boolean;
}

const PlayersActions: FC<ITeamActions> = ({
  filter,
  resetAction,
  inSearch,
}) => {
  const { actionsContainer, actionWrapper } = styles;
  const [search, setSearch] = useState("");
  return (
    <div className={actionsContainer}>
      <div className={actionWrapper}>
        <Input
          handleClick={
            !inSearch
              ? () => {
                  filter(search);
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
