import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getError } from "../error/error-handler";

export const addSprint = createAsyncThunk(
  "sprint/addSprint",
  async ({ projectId, sprintData }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/sprint/${projectId}`, sprintData);
      return data;
    } catch (error) {
      dispatch(
        getError({
          error,
          cb: () => addSprint(),
          operationType: "sprint/addSprint",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const getProjectsSprints = createAsyncThunk(
  "sprint/getSprints",
  async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/sprint/${projectId}`);
      return data;
    } catch (error) {
      dispatch(
        getError({
          error,
          cb: () => getProjectsSprints(),
          operationType: "sprint/getSprints",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const changeSprintsTitle = createAsyncThunk(
  "sprint/changeTitle",
  async (sprintId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.patch(sprintId);
      return data;
    } catch (error) {
      dispatch(
        getError({
          error,
          cb: () => changeSprintsTitle(),
          operationType: "sprint/changeTitle",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSprint = createAsyncThunk(
  "sprint/deleteSprint",
  async (sprintId, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/sprint/${sprintId}`);
      return sprintId;
    } catch (error) {
      dispatch(
        getError({
          error,
          cb: () => deleteSprint(),
          operationType: "sprint/deleteSprint",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);
