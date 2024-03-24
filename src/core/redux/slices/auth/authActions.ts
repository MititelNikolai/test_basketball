import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseRequest } from "../../../api/baseRequest";
import { errorHandler } from "../../../api/utils/errorHandler";
import { LoginData, RegisterData, UpdateUserData } from "./auth.interfaces";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "post",
      url: `/api/Auth/SignUp`,
      data: userData,
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode, "user"));
    }
    return result;
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (userData: LoginData, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "post",
      url: `/api/Auth/SignIn`,
      data: userData,
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode, "login"));
    }
    localStorage.setItem("userToken", result.token);
    return result;
  }
);

export const userUpdate = createAsyncThunk(
  "auth/update",
  async (formData: UpdateUserData, { rejectWithValue }) => {
    const result = await baseRequest({
      method: "post",
      url: `/api/Auth/Change`,
      data: formData,
    });

    if (result.error) {
      return rejectWithValue(errorHandler(result.errorCode));
    }

    return result;
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
