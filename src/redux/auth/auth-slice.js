import { createSlice } from "@reduxjs/toolkit"
import authOperations from "./auth-operations"

const initialState = {
  user: { id: null, email: null },
  token: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    projectRejected: () => initialState,
  },
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {},

    [authOperations.logIn.fulfilled](state, action) {
      state.user.id = action.payload.data.id
      state.user.email = action.payload.data.email
      state.token = action.payload.accessToken
      state.sid = action.payload.sid
      state.refreshToken = action.payload.refreshToken
      state.isLoggedIn = true
    },
    [authOperations.logOut.fulfilled](state, action) {
      state.user = { id: null, email: null }
      state.token = null
      state.refreshToken = null
      state.isLoggedIn = false
      state.sid = null
    },
    [authOperations.refreshToken.pending](state, action) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.refreshToken.rejected](state, action) {
      state.isFetchingCurrentUser = false;
    },
    [authOperations.refreshToken.fulfilled](state, action) {
      state.token = action.payload.newAccessToken
      state.refreshToken = action.payload.newRefreshToken
      state.sid = action.payload.newSid
      state.isLoggedIn = true
      state.isFetchingCurrentUser = false
    },
  },
})

export const { projectRejected } = authSlice.actions
export default authSlice.reducer
