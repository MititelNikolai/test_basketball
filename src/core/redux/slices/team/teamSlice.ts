import { createSlice } from "@reduxjs/toolkit";
import { addTeam } from "./teamActions";
import { InitialState } from "./team.types";

const initialState: InitialState = {
  loading: false,
  error: null,
  success: false,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(addTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTeam.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(addTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetSuccess } = teamSlice.actions;
export default teamSlice.reducer;
