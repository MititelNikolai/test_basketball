import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

interface IAuthSlice {
  loading: boolean;
  userInfo: {
    name: string | null;
    avatarUrl: string | null;
    token: string | null;
  };
  error: any | null;
  success: boolean;
}
/* const token = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null; */
const initialState: IAuthSlice = {
  loading: false,
  userInfo: {
    name: null,
    avatarUrl: null,
    token: null,
  },
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
