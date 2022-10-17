import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IInitalState {
  searchTerm: string;
  issueState: "OPEN" | "CLOSED";
  searchLocation: "body" | "title";
  searchError?: string;
  pagination: number;
  endCursor: string;
}

const initialState: IInitalState = {
  searchTerm: "",
  issueState: "OPEN",
  searchLocation: "title",
  searchError: "",
  pagination: 15,
  endCursor: "",
};

export const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    editSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.searchError = "";
    },
    editIssueState: (state, action: PayloadAction<"OPEN" | "CLOSED">) => {
      state.issueState = action.payload;
    },
    editSearchLocation: (state, action: PayloadAction<"body" | "title">) => {
      state.searchLocation = action.payload;
    },
    editSearchError: (state, action: PayloadAction<string>) => {
      state.searchError = action.payload;
    },
    setPagination: (state, action: PayloadAction<number>) => {
      state.pagination = action.payload * 15;
    },
    setEndCursor: (state, action: PayloadAction<string>) => {
      state.endCursor = action.payload;
    },
  },
});

export const issueState = (state: RootState) => state.issue;

export const {
  editSearchTerm,
  editIssueState,
  editSearchLocation,
  editSearchError,
  setPagination,
  setEndCursor,
} = issueSlice.actions;

export default issueSlice.reducer;
