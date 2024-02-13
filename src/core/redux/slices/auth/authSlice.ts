import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";
import { RootState } from "../../store";
import { IAuthSlice, IUser } from "./auth.types";

const storedUserData = localStorage.getItem("userData");

const data: IUser | null = storedUserData ? JSON.parse(storedUserData) : null;
const initialState: IAuthSlice = {
  loading: false,
  userInfo: {
    name: null,
    avatarUrl: null,
    token: data ? data?.token : null,
  },
  error: null,
  success: false,
  isAuthenticated: data?.token ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo.name = null;
      state.userInfo.avatarUrl = null;
      state.userInfo.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userData");
    },
  },
  extraReducers(builder) {
    //Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //Login
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo.name = payload.name;
      state.userInfo.avatarUrl = payload.avatarUrl;
      state.userInfo.token = payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("userData", JSON.stringify(payload));
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.userInfo;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUserToken = (state: RootState) => state.auth.userInfo.token;
export default authSlice.reducer;
