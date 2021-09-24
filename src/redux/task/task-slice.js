import { createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  getSprintsTasks,
  deleteSprintsTask,
  patchTaskHours,
} from "./task-operations";

const initialState = {
  items: [],
  error: null,
  loading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: {
    [addTask.fulfilled](state, { payload }) {
      state.error = null;
      state.items.push(payload);
      state.loading = false;
    },
    [addTask.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [getSprintsTasks.fulfilled](state, { payload }) {
      if (payload.message === "No tasks found") return initialState;
      if (payload.length === 0) {
        return false;
      }
      state.items = [...payload];
    },
    [deleteSprintsTask.fulfilled](state, { payload }) {
      state.items = [
        ...state.items.filter((task) => {
          const taskId = task._id ?? task.id;
          return taskId !== payload;
        }),
      ];
    },
    [patchTaskHours.fulfilled](state, { payload }) {
      state.items = state.items.map((task) => {
        const taskId = task._id ?? task.id;
        if (taskId !== payload.id) {
          return task;
        }
        task.hoursWasted = payload.wastedHours;
        task.hoursWastedPerDay = task?.hoursWastedPerDay.map((itemDate) => {
          console.log(itemDate);
          if (itemDate.currentDay) {
            if (itemDate.currentDay === payload.date.currentDay) {
              return { ...itemDate, ...payload.date };
            }
            return itemDate;
          }
        });
        return task;
      });
    },
  },
});

export default tasksSlice.reducer;
