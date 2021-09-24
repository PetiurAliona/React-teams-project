import { createAsyncThunk } from "@reduxjs/toolkit";
import { authOperations } from "../auth";

const getErrorWithStatus = (error) => {
  error.status = +error.message.slice(-3);
  return error;
};

export const getError =
  ({ error, cb, operationType }) =>
  (dispatch) => {
    const operation = createAsyncThunk(
      operationType,
      async ({ error, cb, operationType }, { rejectWithValue, dispatch }) => {
        const { status, message } = getErrorWithStatus(error);
        if (status === 401) {
          dispatch(authOperations.refreshToken(cb));
        }
        return rejectWithValue({ status, message });
      }
    );
    dispatch(operation({ error, cb, operationType }));
  };
