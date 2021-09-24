import { createSlice } from "@reduxjs/toolkit";
import { patchTitleSprint } from "../task/task-operations";
import {
  addSprint,
  deleteSprint,
  getProjectsSprints,
} from "./sprints-operations";

const initialState = {
  items: [],
  error: null,
  loading: false,
};

const sprintsSlice = createSlice({
  name: "sprints",
  initialState,
  extraReducers: {
    [addSprint.fulfilled](state, { payload }) {
      state.error = null;
      state.items.push(payload);
      state.loading = false;
    },

    [getProjectsSprints.fulfilled](state, { payload }) {
      if (payload.message === "No sprints found") return initialState;
      return {
        error: null,
        items: [...payload.sprints],
        loading: false,
      };
    },

    [deleteSprint.fulfilled](state, { payload }) {
      state.items = [
        ...state.items.filter((item) => {
          const itemId = item._id ?? item.id;
          return itemId !== payload;
        }),
      ];
    },

    [patchTitleSprint.fulfilled](state, { payload }) {
      state.items = state.items.map((sprint) => {
        if (sprint._id ?? sprint.id === payload.id) {
          sprint.title = payload.title.newTitle;
        }
        return sprint;
      });
    },
  },
});

export default sprintsSlice.reducer;
