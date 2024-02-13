import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../../apiData";
import axios from "axios";
import { RootState } from "../../store";
import { IAddFormInputs } from "../../../../pages/AddTeam/components/IAddFormInputs";
import { IAddTeamData } from "./team.types";
import uploadImageToServer from "../../../../api/imageRequests/uploadImageToServer";

export const addTeam = createAsyncThunk(
  "team/addTeam",
  async (formData: IAddFormInputs, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    console.log(token);
    const { name, division, conference } = formData;
    const dataToServer: IAddTeamData = {
      name,
      foundationYear: parseInt(formData.foundationYear),
      division,
      conference,
      imageUrl: await uploadImageToServer(formData.file_img, token),
    };
    console.log(dataToServer);
    try {
      const response = await axios.post(
        `${backendUrl}/api/Team/Add`,
        dataToServer,
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
