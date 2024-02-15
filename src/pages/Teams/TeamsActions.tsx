import { FC, useState } from "react";
import Input from "../../ui/Input/Input";
import IconSearch from "../../ui/icons/IconSearch";
import Button from "../../ui/Button/Button";
import styles from "./Teams.module.css";
import { NavLink } from "react-router-dom";

interface ITeamActions {
  filter: (search: string) => void;
}

const TeamsActions: FC<ITeamActions> = ({ filter }) => {
  const { actionsContainer, actionWrapper } = styles;
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className={actionsContainer}>
      <div className={actionWrapper}>
        <Input
          handleClick={() => filter(search)}
          setValue={setSearch}
          value={search}
          inputType='text'
          placeholder='Search...'
          background='white'
          needMessage={false}
        >
          <IconSearch />
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
