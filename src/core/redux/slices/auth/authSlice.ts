import { createSelector, createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, userUpdate } from "./authActions";
import { RootState } from "../../store";
import { IAuthSlice, IUser } from "./auth.interfaces";

const storedUserData = localStorage.getItem("userData");

const data: IUser | null = storedUserData ? JSON.parse(storedUserData) : null;
const initialState: IAuthSlice = {
  loading: false,
  userInfo: {
    name: data ? data?.name : null,
    avatarUrl: data ? data?.avatarUrl : null,
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
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
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
    //Update
    builder.addCase(userUpdate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      console.log(action.payload);
    });
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, resetError, resetSuccess } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.userInfo;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUserToken = (state: RootState) => state.auth.userInfo.token;
export const selectAuthStatus = createSelector(
  (state: RootState) => state.auth.success,
  (state: RootState) => state.auth.loading,
  (state: RootState) => state.auth.error,
  (success, loading, error) => ({
    success,
    loading,
    error,
  })
);
export default authSlice.reducer;
