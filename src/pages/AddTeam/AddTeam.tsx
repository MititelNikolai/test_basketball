import { FC, useEffect } from "react";
import styles from "./AddTeam.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import AddTeamForm from "./components/AddTeamForm";
import { IAddFormInputs } from "./components/IAddFormInputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { addTeam } from "../../core/redux/slices/team/teamActions";
import { resetSuccess } from "../../core/redux/slices/team/teamSlice";

const AddTeam: FC = () => {
  const { addTeamContainer } = styles;

  const { loading, success } = useSelector((state: RootState) => state.team);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("/teams");
    }
  }, [navigate, dispatch, success]);

  const handleSubmit = (formData: IAddFormInputs) =>
    dispatch(addTeam(formData) as any);

  return (
    <div className={addTeamContainer}>
      <Breadcrumbs pathname={location.pathname} />
      <AddTeamForm onSubmit={(data) => handleSubmit(data)} loading={loading} />
    </div>
  );
};

export default AddTeam;
