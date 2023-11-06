import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState: ReduxState = {
  lines: [],
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addMouseLine: (state, action: PayloadAction<ReduxPayload>) => {
      state.lines = [...state.lines, { type: "mouse", id: action.payload.id }];
    },
    removeMouseLine: (state) => {
      state.lines = [...state.lines.filter((line) => line.type !== "mouse")];
    },
    addObjectLine: (state, action: PayloadAction<ReduxPayload>) => {
      const mouseLine = state.lines.filter((line) => line.type === "mouse")[0];

      //const newLine = action.payload;

      if (mouseLine && mouseLine.id[0] !== action.payload.id[0]) {
        const newLine: ReduxLine = { type: "object", id: [action.payload.id[0], mouseLine.id[0]] };

        if (!state.lines.find((line) => line.id.join(".") === newLine.id.join(".") || line.id.reverse().join(".") === newLine.id.join("."))) {
          state.lines = [...state.lines.filter((line) => line.type !== "mouse"), newLine];
        }
      }
    },
  },
});

export const { addMouseLine, removeMouseLine, addObjectLine } = slice.actions;
export default slice.reducer;
