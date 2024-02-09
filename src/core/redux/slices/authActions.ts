import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IRegisterData {
  userName: string;
  login: string;
  password: string;
}
export interface ILoginData {
  login: string;
  password: string;
}
const backendUrl = "http://dev.trainee.dex-it.ru";

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
      console.log(data);
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
