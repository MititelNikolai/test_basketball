import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAddTeamData, IGetTeamsParameters } from "./team.interfaces";
import { baseRequest } from "../../../api/baseRequest";

export const addTeam = createAsyncThunk(
  "team/addTeam",
  async (formData: IAddTeamData, { rejectWithValue, getState }) => {
    const result = await baseRequest(
      {
        method: "post",
        url: `/api/Team/Add`,
        data: formData,
      },
      getState as () => RootState
    );
    if (result.error) {
      return rejectWithValue("Such a team already exists");
    }
    return result;
  }
);
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (formData: IAddTeamData, { rejectWithValue, getState }) => {
    const result = await baseRequest(
      {
        method: "put",
        url: `/api/Team/Update`,
        data: formData,
      },
      getState as () => RootState
    );
    if (result.error) {
      return rejectWithValue("Such a team already exists");
    }
    return result;
  }
);
export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (
    { name, page, pageSize }: IGetTeamsParameters = {},
    { rejectWithValue, getState }
  ) => {
    const result = await baseRequest(
      {
        method: "get",
        url: `/api/Team/GetTeams`,
        params: { name, page, pageSize },
      },
      getState as () => RootState
    );
    if (result.error) {
      return rejectWithValue(result.error.errorMessage);
    }
    return result;
  }
);

export const getTeam = createAsyncThunk(
  "team/getTeam",
  async (id: number, { rejectWithValue, getState }) => {
    const result = await baseRequest(
      {
        method: "get",
        url: `/api/Team/Get`,
        params: { id },
      },
      getState as () => RootState
    );
    if (result.error) {
      return rejectWithValue(result.error.errorMessage);
    }
    return result;
  }
);
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id: number, { rejectWithValue, getState }) => {
    const result = await baseRequest(
      {
        method: "delete",
        url: `/api/Team/Delete`,
        params: { id },
      },
      getState as () => RootState
    );
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
