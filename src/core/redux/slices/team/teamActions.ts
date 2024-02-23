import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../../apiData";
import axios from "axios";
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
    } catch (error: any) {
      localStorage.removeItem("userData");
      return rejectWithValue(`Failed to fetch teams: ${error.message}`);
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
    } catch (error: any) {
      return rejectWithValue(`Failed to fetch teams: ${error.message}`);
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
    } catch (error: any) {
      return rejectWithValue(`Failed to delete team: ${error.message}`);
    }
  }
);
