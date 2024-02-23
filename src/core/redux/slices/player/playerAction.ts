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
    } catch (error: any) {
      localStorage.removeItem("userData");
      return rejectWithValue(`Failed to fetch players: ${error.message}`);
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
    } catch (error: any) {
      return rejectWithValue(`Failed to fetch Positions: ${error.message}`);
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
    } catch (error: any) {
      return rejectWithValue(`Failed to fetch players: ${error.message}`);
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
    } catch (error: any) {
      return rejectWithValue(`Failed to delete player: ${error.message}`);
    }
  }
);
