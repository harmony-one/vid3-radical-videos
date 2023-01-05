import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecordType } from "../types";
import { RootState } from "./store";

export const recordSlice = createSlice({
  name: "record",
  initialState: {
    currentRecord: {
      renter: "",
      lastPrice: {},
      timeUpdated: 0,
      url: "",
      prev: "",
      next: "",
    }
  },
  reducers: {
    setRecord : (state : any, action: PayloadAction<RecordType>) => {
      state.currentRecord = action.payload;
    },
  },
});

export const { setRecord } = recordSlice.actions;

export const selectRecord = (state: RootState) => state.record.currentRecord;

export default recordSlice.reducer;
