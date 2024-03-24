import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseRequest } from "../../../api/baseRequest";
import { errorHandler } from "../../../api/utils/errorHandler";
import { AddTeamData, GetTeamsParameters } from "./team.interfaces";

export const addTeam = createAsyncThunk(
  "team/addTeam",
  async (formData: AddTeamData, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "post",
      url: `/api/Team/Add`,
      data: formData,
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode, "team"));
    }
    return result;
  }
);
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (formData: AddTeamData, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "put",
      url: `/api/Team/Update`,
      data: formData,
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode, "team"));
    }
    return result;
  }
);
export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (
    { name, page, pageSize }: GetTeamsParameters = {},
    { rejectWithValue }
  ) => {
    const result = await baseRequest({
      method: "get",
      url: `/api/Team/GetTeams`,
      params: { name, page, pageSize },
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode));
    }
    return result;
  }
);

export const getTeam = createAsyncThunk(
  "team/getTeam",
  async (id: number, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "get",
      url: `/api/Team/Get`,
      params: { id },
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode));
    }
    return result;
  }
);
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id: number, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "delete",
      url: `/api/Team/Delete`,
      params: { id },
    });

    if (result.error) {
      return rejectWithValue("Team has players");
    }
    return result;
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
