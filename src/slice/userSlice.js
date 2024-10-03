import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  token: sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : null,
  currentUser: JSON.parse(sessionStorage.getItem("currentUser")) || {},
  isLoggedIn: sessionStorage.getItem("token") ? true : false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    logout(state) {
      state.token = null;
      state.currentUser = {};
      state.error = null;
      state.loading = false;
      state.isLoggedIn = false;
      sessionStorage.clear();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.error = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.token = null;
        state.error = "error";
        state.isLoggedIn = false;
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(postUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(postUserName.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(postUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const login = createAsyncThunk("userSlice/login", async (userData) => {
  const { data } = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    userData
  );
  console.log(data.body)
  return data.body;
  
});

export const getUser = createAsyncThunk("user/getUser", async (token) => {
  const { data } = await axios.get(
    "http://localhost:3001/api/v1/user/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.body;
});

export const postUserName = createAsyncThunk(
  "user/postUserName",
  async ({ token, userName }) => {
    const { data } = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      { userName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.body;
  }
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
