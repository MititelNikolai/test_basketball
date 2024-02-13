import { FC, useEffect } from "react";
import styles from "./AddTeam.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import AddTeamForm from "./components/AddTeamForm";
import { IAddFormInputs } from "./components/IAddFormInputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { addTeamImage } from "../../core/redux/slices/team/teamActions";
const AddTeam: FC = () => {
  const { addTeamContainer } = styles;

  const { loading, success } = useSelector((state: RootState) => state.team);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (data: IAddFormInputs) => {
    console.log(data);
    const { file_img, ...preparedData } = data;

    console.log({
      ...preparedData,
      foundationYear: parseInt(data.foundationYear),
    });
    dispatch(addTeamImage(data.file_img) as any);
  };
  useEffect(() => {
    if (success) navigate("/teams");
  }, [navigate, success]);

  return (
    <div className={addTeamContainer}>
      <Breadcrumbs pathname={location.pathname} />
      <AddTeamForm onSubmit={(data) => handleSubmit(data)} loading={loading} />
    </div>
  );
};

export default AddTeam;
