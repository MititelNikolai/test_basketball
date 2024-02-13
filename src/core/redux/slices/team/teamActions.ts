import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAddTeamData } from "./team.types";
import axios from "axios";
const backendUrl = "http://dev.trainee.dex-it.ru";

export const addTeam = createAsyncThunk(
  "team/add",
  async (teamData: IAddTeamData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${backendUrl}/api/Team/Add`,
        teamData,
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(`Add team ERROR ${error}`);
    }
  }
);

export const addTeamImage = createAsyncThunk(
  "team/addImage",
  async (file: File, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        `${backendUrl}/api/Image/SaveImage`,
        formData,
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(`Add team Image ERROR ${error}`);
    }
  }
);
