import qs from "qs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseRequest } from "../../../api/baseRequest";
import { errorHandler } from "../../../api/utils/errorHandler";
import {
  GetPlayersParameters,
  PlayerData,
  PlayerDataToServer,
} from "./player.interfaces";

export const playerAdd = createAsyncThunk(
  "player/add",
  async (formData: PlayerDataToServer, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "post",
      url: `/api/Player/Add`,
      data: formData,
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode, "player"));
    }
    return result;
  }
);

export const updatePlayer = createAsyncThunk(
  "player/updatePlayer",
  async (formData: PlayerData, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "put",
      url: `/api/Player/Update`,
      data: formData,
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode, "player"));
    }
    return result;
  }
);

export const getPlayers = createAsyncThunk(
  "player/getPlayers",
  async (
    { name, teamIds, page, pageSize }: GetPlayersParameters = {},
    { rejectWithValue }
  ) => {
    const result = await baseRequest({
      method: "get",
      url: `/api/Player/GetPlayers`,
      params: { name, page, pageSize },
      paramsSerializer: (params: Record<string, any>) => {
        return qs.stringify(
          { ...params, TeamIds: teamIds },
          { arrayFormat: "repeat" }
        );
      },
    });

    if (result.error) {
      localStorage.removeItem("userData");
      return rejectWithValue(errorHandler(result.errorCode));
    }
    return result;
  }
);
export const getPositions = createAsyncThunk(
  "player/getPositions",
  async (_, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "get",
      url: `/api/Player/GetPositions`,
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode));
    }
    return result;
  }
);

export const getPlayer = createAsyncThunk(
  "player/getPlayer",
  async (id: number, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "get",
      url: `/api/Player/Get`,
      params: { id },
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode));
    }
    return result;
  }
);

export const deletePlayer = createAsyncThunk(
  "player/deletePlayer",
  async (id: number, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "delete",
      url: `/api/Player/Delete`,
      params: { id },
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode));
    }
    return result;
  }
);

// Определение типа для каждого thunk-действия
type AddPlayerAction = ReturnType<typeof playerAdd.fulfilled>;
type UpdatePlayerAction = ReturnType<typeof updatePlayer.fulfilled>;
type GetPlayersAction = ReturnType<typeof getPlayers.fulfilled>;
type GetPositionsPlayersAction = ReturnType<typeof getPositions.fulfilled>;
type GetPlayerAction = ReturnType<typeof getPlayer.fulfilled>;
type DeletePlayerAction = ReturnType<typeof deletePlayer.fulfilled>;

// Объединение типов для всех возможных действий
export type AllPlayersActions =
  | AddPlayerAction
  | UpdatePlayerAction
  | GetPlayersAction
  | GetPositionsPlayersAction
  | GetPlayerAction
  | DeletePlayerAction;
