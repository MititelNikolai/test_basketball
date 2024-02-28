import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../../apiData";
import {
  IGetPlayersParameters,
  IPlayerData,
  IPlayerDataToServer,
  ISinglePlayerData,
} from "./player.types";
import { RootState } from "../../store";
import axios from "axios";
import qs from "qs";

export const playerAdd = createAsyncThunk(
  "player/add",
  async (formData: IPlayerDataToServer, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const response = await axios.post(
        `${backendUrl}/api/Player/Add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePlayer = createAsyncThunk(
  "player/updatePlayer",
  async (formData: IPlayerData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const response = await axios.put(
        `${backendUrl}/api/Player/Update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getPlayers = createAsyncThunk(
  "player/getPlayers",
  async (
    { name, teamIds, page, pageSize }: IGetPlayersParameters = {},
    { rejectWithValue, getState }
  ) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const { data } = await axios.get(`${backendUrl}/api/Player/GetPlayers`, {
        params: { name, page, pageSize },
        paramsSerializer: (params) => {
          return qs.stringify(
            { ...params, TeamIds: teamIds },
            { arrayFormat: "repeat" }
          );
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      localStorage.removeItem("userData");
      return rejectWithValue(error);
    }
  }
);
export const getPositions = createAsyncThunk(
  "player/getPositions",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/Player/GetPositions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPlayer = createAsyncThunk(
  "player/getPlayer",
  async (id: number, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const { data } = await axios.get(`${backendUrl}/api/Player/Get`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data as ISinglePlayerData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePlayer = createAsyncThunk(
  "player/deletePlayer",
  async (id: number, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const { data } = await axios.delete(`${backendUrl}/api/Player/Delete`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Определение типа для каждого thunk-действия
type AddPlayerAction = ReturnType<typeof playerAdd.fulfilled>;
type UpdatePlayerAction = ReturnType<typeof updatePlayer.fulfilled>;
export type GetPlayersAction = ReturnType<typeof getPlayers.fulfilled>;
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
