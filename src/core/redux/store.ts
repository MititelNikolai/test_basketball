import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import teamReducer from "./slices/team/teamSlice";
import playerReducer from "./slices/player/playerSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
