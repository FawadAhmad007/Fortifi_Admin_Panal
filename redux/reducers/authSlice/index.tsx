import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  refreshToken: null,
  user: null,
  sessionExpired: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.sessionExpired = false;
    },
    setSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
    },
  },
});

export const { loginSuccess, logout, setSessionExpired } = authSlice.actions;
export default authSlice.reducer;
