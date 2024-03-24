import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  addTeam,
  deleteTeam,
  getTeam,
  getTeams,
  updateTeam,
} from "./teamActions";
import { InitialState } from "./team.interfaces";

const initialState: InitialState = {
  loading: false,
  error: null,
  success: false,
  teamDataFromServer: {
    data: [],
    count: null,
    page: null,
    size: null,
  },
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    resetTeamSuccess: (state) => {
      state.success = false;
    },
    setTeamError: (state, action) => {
      state.error = action.payload;
    },
    resetTeamError: (state) => {
      state.error = null;
    },
    resetAddedTeamSuccess: (state) => {
      delete state.addedTeamSuccess;
    },
    resetCurrentTeam: (state) => {
      delete state.currentTeam;
    },
    resetTeamItems: (state) => {
      state.teamDataFromServer.data = [];
    },
  },
  extraReducers(builder) {
    //AddTeam
    builder.addCase(addTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.addedTeamSuccess = action.payload.id;
    });
    builder.addCase(addTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //UpdateTeam
    builder.addCase(updateTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTeam.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //GetAllTeams
    builder.addCase(getTeams.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teamDataFromServer.data = action.payload.data;
      state.teamDataFromServer.count = action.payload.count;
      state.teamDataFromServer.page = action.payload.page;
      state.teamDataFromServer.size = action.payload.size;
    });
    builder.addCase(getTeams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //GetCurrentTeam
    builder.addCase(getTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.currentTeam = action.payload;
    });
    builder.addCase(getTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //DeleteCurrentTeam
    builder.addCase(deleteTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTeam.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const getNumberOfTeams = (state: RootState) =>
  state.team.teamDataFromServer.count;
export const getPageTeams = (state: RootState) =>
  state.team.teamDataFromServer.page;
export const getSizeTeams = (state: RootState) =>
  state.team.teamDataFromServer.size;

export const selectTeams = (state: RootState) =>
  state.team.teamDataFromServer.data;
export const selectTeam = (state: RootState) => state.team.currentTeam;

export const selectTeamStatus = createSelector(
  (state: RootState) => state.team.success,
  (state: RootState) => state.team.loading,
  (state: RootState) => state.team.error,
  (state: RootState) => state.team.addedTeamSuccess,
  (success, loading, error, addedTeamSuccess) => ({
    success,
    loading,
    error,
    addedTeamSuccess,
  })
);
export const {
  resetTeamSuccess,
  resetCurrentTeam,
  resetTeamItems,
  resetAddedTeamSuccess,
  resetTeamError,
  setTeamError,
} = teamSlice.actions;

export default teamSlice.reducer;
