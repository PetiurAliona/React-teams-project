import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetErrorAction } from "../error/error-action";
import { setErrorStatus } from "../../helpers/function";
import { projectLogOut } from "../projects/projects-slice";

axios.defaults.baseURL = "https://sbc-backend.goit.global";

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      token.set(data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(setErrorStatus(error));
    } finally {
      dispatch(resetErrorAction());
    }
  }
);

const register = createAsyncThunk(
  "auth/register",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", credentials);
      await dispatch(logIn(credentials));

      return data;
    } catch (error) {
      return rejectWithValue(setErrorStatus(error));
      //
    } finally {
      dispatch(resetErrorAction());
    }
  }
);

const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      await axios.post("/auth/logout");

      dispatch(projectLogOut());
    } catch (error) {
      return rejectWithValue(setErrorStatus(error));
    } finally {
      dispatch(resetErrorAction());
    }
  }
);

const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (cb, { getState, rejectWithValue, dispatch }) => {
    const state = getState();
    const persistedRefreshToken = state.auth.refreshToken;
    const sid = state.auth.sid;

    if (persistedRefreshToken === null) {
      token.unset();

      return rejectWithValue();
    }
    token.set(persistedRefreshToken);
    try {
      const { data } = await axios.post("/auth/refresh", { sid });
      token.set(data.newAccessToken);
      if (cb) {
        dispatch(cb());
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const operations = {
  register,
  logOut,
  logIn,
  refreshToken,
};
export default operations;
