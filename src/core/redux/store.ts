import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import teamReducer from "./slices/team/teamSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
