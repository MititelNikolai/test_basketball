import { createSlice } from "@reduxjs/toolkit";
import { IAddTeamData } from "./team.types";
import { addTeamImage } from "./teamActions";

const initialState = {
  loading: <boolean>false,
  teamData: <IAddTeamData>{
    name: null,
    foundationYear: null,
    division: null,
    conference: null,
    imageUrl: null,
  },
  error: <any | null>null,
  success: <boolean>false,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addTeamImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTeamImage.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(addTeamImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default teamSlice.reducer;
