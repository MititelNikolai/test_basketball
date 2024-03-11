import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../core/redux/store";
import { AllTeamActions } from "../core/redux/slices/team/teamActions";
import { AllPlayersActions } from "../core/redux/slices/player/playerAction";
import { AllAuthActions } from "../core/redux/slices/auth/authActions";

export const useTypedDispatch = () => {
  const dispatch = useDispatch();
  return dispatch as ThunkDispatch<
    RootState,
    void,
    AllPlayersActions | AllTeamActions | AllAuthActions
  >;
};
