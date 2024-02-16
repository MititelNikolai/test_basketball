import { createSlice } from "@reduxjs/toolkit";
import {
  addTeam,
  deleteTeam,
  getTeam,
  getTeams,
  updateTeam,
} from "./teamActions";
import { InitialState } from "./team.types";
import { RootState } from "../../store";

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
    resetSuccess: (state) => {
      state.success = false;
    },
    clearCurrentTeam: (state) => {
      delete state.currentTeam;
    },
    clearTeamItems: (state) => {
      state.teamDataFromServer.data = [];
    },
  },
  extraReducers(builder) {
    //AddTeam
    builder.addCase(addTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTeam.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
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
export const selectTeams = (state: RootState) =>
  state.team.teamDataFromServer.data;
export const getNumberOfTeams = (state: RootState) =>
  state.team.teamDataFromServer.count;
export const getPageTeams = (state: RootState) =>
  state.team.teamDataFromServer.page;
export const getSizeTeams = (state: RootState) =>
  state.team.teamDataFromServer.size;
export const selectTeam = (state: RootState) => state.team.currentTeam;
export const { resetSuccess, clearCurrentTeam, clearTeamItems } =
  teamSlice.actions;
export default teamSlice.reducer;
