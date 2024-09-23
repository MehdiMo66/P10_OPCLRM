import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  token: localStorage.getItem('token') || '',
  currentUser: {},
  isLoggedIn: false,
  loading: false,
  error: null,
  

};

const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    logout(state) {
      state.token = null;
      localStorage.clear();
      state.currentUser = {};
      state.error = null;
      state.loading = false;
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.error = false;
      state.isLoggedIn = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.token = null;
      state.error = "error";
      state.isLoggedIn = false;
      localStorage.clear();
    });

    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
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
    return data;
  }
);

export const { logout, setToken } = userSlice.actions;
export default userSlice.reducer;
