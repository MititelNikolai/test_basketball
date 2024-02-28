import axios, { AxiosError } from "axios";
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
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 409) {
        return rejectWithValue("This user already exists");
      }
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
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 401) {
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

// Определение типа для каждого thunk-действия
type RegisterUserAction = ReturnType<typeof registerUser.fulfilled>;
type LoginUserAction = ReturnType<typeof userLogin.fulfilled>;
type UpdateUserAction = ReturnType<typeof userUpdate.fulfilled>;

// Объединение типов для всех возможных действий
export type AllAuthActions =
  | RegisterUserAction
  | LoginUserAction
  | UpdateUserAction;
