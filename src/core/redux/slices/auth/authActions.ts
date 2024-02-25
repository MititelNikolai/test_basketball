import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginData, IRegisterData, IUpdateUserData } from "./auth.types";
import { backendUrl } from "../../apiData";
import { RootState } from "../../store";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ userName, login, password }: IRegisterData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${backendUrl}/api/Auth/SignUp`,
        { userName, login, password },
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Registration failed");
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ login, password }: ILoginData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/api/Auth/SignIn`,
        { login, password },
        config
      );
      localStorage.setItem("userToken", data.token);
      return data;
    } catch (error: any) {
      if (error.response.status === 401) {
        return rejectWithValue(
          "User with the specified username / password was not found."
        );
      }
    }
  }
);

export const userUpdate = createAsyncThunk(
  "auth/update",
  async (formData: IUpdateUserData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.userInfo.token;
    try {
      const response = await axios.post(
        `${backendUrl}/api/Auth/Change`,
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
export default registerUser;
