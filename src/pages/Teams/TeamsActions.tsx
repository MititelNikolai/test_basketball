import { FC } from "react";
import Input from "../../ui/Input/Input";
import IconSearch from "../../ui/icons/IconSearch";
import Button from "../../ui/Button/Button";
import styles from "./Teams.module.css";
import { NavLink } from "react-router-dom";
const TeamsActions: FC = () => {
  const { actionsContainer, actionWrapper } = styles;
  return (
    <div className={actionsContainer}>
      <div className={actionWrapper}>
        <Input
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
