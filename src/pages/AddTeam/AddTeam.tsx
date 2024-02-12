import { FC } from "react";
import styles from "./AddTeam.module.css";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import AddTeamForm from "./components/AddTeamForm";
import { IAddFormInputs } from "./components/IAddFormInputs";
const AddTeam: FC = () => {
  const { addTeamContainer } = styles;
  const location = useLocation();
  const handleSubmit = async (data: IAddFormInputs) => {
    console.log(data);
    const { file_img, ...preparedData } = data;

    console.log("Prepared", {
      ...preparedData,
      foundationYear: parseInt(data.foundationYear),
      imageUrl: "someUrl",
    });
    //Logic add Team
  };
  return (
    <div className={addTeamContainer}>
      <Breadcrumbs pathname={location.pathname} />
      <AddTeamForm onSubmit={(data) => handleSubmit(data)} />
    </div>
  );
};

export default AddTeam;
