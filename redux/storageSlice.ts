import { StorageStatesModel } from "@/app/model/redux/StorageStatesModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: StorageStatesModel = {
  sessionData: {
    path: "",
    message: "",
  },
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setSessionData: (
      state,
      action: PayloadAction<{ path: string; message: string }>
    ) => {
      state.sessionData = action.payload;
    },
  },
});

export const { setSessionData } = storageSlice.actions;

export const getSessionData = (state: RootState) =>
  state.reduxStorage.sessionData;

export default storageSlice.reducer;
