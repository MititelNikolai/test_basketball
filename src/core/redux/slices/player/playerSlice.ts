import { createSelector, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./player.interfaces";
import {
  getPlayers,
  playerAdd,
  updatePlayer,
  getPlayer,
  deletePlayer,
  getPositions,
} from "./playerAction";
import { RootState } from "../../store";

const initialState: InitialState = {
  loading: false,
  error: null,
  success: false,
  playerDataFromServer: {
    data: [],
    count: null,
    page: null,
    size: null,
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    resetPlayerSuccess: (state) => {
      state.success = false;
    },
    resetAddedPlayerSuccess: (state) => {
      delete state.addedPlayerSuccess;
    },
    resetCurrentPlayer: (state) => {
      delete state.currentPlayer;
    },
    resetPlayerItems: (state) => {
      state.playerDataFromServer.data = [];
    },
  },
  extraReducers(builder) {
    //playerAdd
    builder.addCase(playerAdd.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(playerAdd.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.addedPlayerSuccess = action.payload.id;
    });
    builder.addCase(playerAdd.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //updatePlayer
    builder.addCase(updatePlayer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePlayer.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updatePlayer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //GetAllPlayers
    builder.addCase(getPlayers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPlayers.fulfilled, (state, action) => {
      state.loading = false;
      state.playerDataFromServer.data = action.payload.data;
      state.playerDataFromServer.count = action.payload.count;
      state.playerDataFromServer.page = action.payload.page;
      state.playerDataFromServer.size = action.payload.size;
    });
    builder.addCase(getPlayers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //GetCurrentPlayer
    builder.addCase(getPlayer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPlayer.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPlayer = action.payload;
    });
    builder.addCase(getPlayer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //DeleteCurrentPlayer
    builder.addCase(deletePlayer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePlayer.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deletePlayer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //GetPositions
    builder.addCase(getPositions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.loading = false;
      state.positionsPlayers = action.payload;
    });
    builder.addCase(getPositions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const selectPlayers = (state: RootState) =>
  state.player.playerDataFromServer.data;
export const getNumberOfPlayers = (state: RootState) =>
  state.player.playerDataFromServer.count;
export const getPagePlayers = (state: RootState) =>
  state.player.playerDataFromServer.page;
export const getSizePlayers = (state: RootState) =>
  state.player.playerDataFromServer.size;
export const selectPlayer = (state: RootState) => state.player.currentPlayer;
export const selectPositions = (state: RootState) =>
  state.player.positionsPlayers;
export const selectPlayerStatus = createSelector(
  (state: RootState) => state.player.success,
  (state: RootState) => state.player.loading,
  (state: RootState) => state.player.error,
  (state: RootState) => state.player.addedPlayerSuccess,
  (success, loading, error, addedPlayerSuccess) => ({
    success,
    loading,
    error,
    addedPlayerSuccess,
  })
);

export const {
  resetPlayerSuccess,
  resetCurrentPlayer,
  resetPlayerItems,
  resetAddedPlayerSuccess,
} = playerSlice.actions;

export default playerSlice.reducer;
