import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../../apiData";
import axios from "axios";
import AxiosStatic from "axios";
import { RootState } from "../../store";
import { IAddTeamData, IGetTeamsParameters, ITeamData } from "./team.types";

export const addTeam = createAsyncThunk(
  "team/addTeam",
  async (formData: IAddTeamData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const response = await axios.post(
        `${backendUrl}/api/Team/Add`,
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
      if (!AxiosStatic.isAxiosError(error)) {
        throw error;
      }
      if (error.response?.status === 409) {
        return rejectWithValue("Such a team already exists");
      }
      return rejectWithValue(error.message);
    }
  }
);
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (formData: IAddTeamData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const response = await axios.put(
        `${backendUrl}/api/Team/Update`,
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
      if (!AxiosStatic.isAxiosError(error)) {
        throw error;
      }
      if (error.response?.status === 409) {
        return rejectWithValue("Such a team already exists");
      }
      return rejectWithValue(error.message);
    }
  }
);
export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (
    { name, page, pageSize }: IGetTeamsParameters = {},
    { rejectWithValue, getState }
  ) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const { data } = await axios.get(`${backendUrl}/api/Team/GetTeams`, {
        params: { name, page, pageSize },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      localStorage.removeItem("userData");
      if (!AxiosStatic.isAxiosError(error)) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getTeam = createAsyncThunk(
  "team/getTeam",
  async (id: number, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const { data } = await axios.get(`${backendUrl}/api/Team/Get`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data as ITeamData;
    } catch (error) {
      if (!AxiosStatic.isAxiosError(error)) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id: number, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const { data } = await axios.delete(`${backendUrl}/api/Team/Delete`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      if (!AxiosStatic.isAxiosError(error)) {
        throw error;
      }
      if (error.response?.status === 500) {
        return rejectWithValue("Team has players");
      }
    }
  }
);

// Определение типа для каждого thunk-действия
type AddTeamAction = ReturnType<typeof addTeam.fulfilled>;
type UpdateTeamAction = ReturnType<typeof updateTeam.fulfilled>;
type GetTeamsAction = ReturnType<typeof getTeams.fulfilled>;
type GetTeamAction = ReturnType<typeof getTeam.fulfilled>;
type DeleteTeamAction = ReturnType<typeof deleteTeam.fulfilled>;

// Объединение типов для всех возможных действий
export type AllTeamActions =
  | AddTeamAction
  | UpdateTeamAction
  | GetTeamsAction
  | GetTeamAction
  | DeleteTeamAction;
