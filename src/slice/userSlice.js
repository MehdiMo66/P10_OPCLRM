import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import axios from "axios";

const initialState = {
  token: null,
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
      sessionStorage.clear();
      state.currentUser = {};
      state.error = null;
      state.loading = false;
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      sessionStorage.setItem("token", action.payload.token);
      state.error = false;
      state.isLoggedIn = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.token = null;
      state.error = "error";
      state.isLoggedIn = false;
      localStorage.clear();
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.error = false;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.error = "error";
    });
  },
});

export const login = createAsyncThunk("userSlice/login", async (userData) => {
  const { data } = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    userData
  );

  //console.log(data);
  return data;
});




/*export const getProfile = createAsyncThunk("userSlice/getProfile", async ({getUser} )=> {

  const token = "getState().userSlice.token"
  const { data } = await axios.get(
    "http://localhost:3001/api/v1/user/profile",
    {getUser},
    {
        headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);
  return data.body;
});*/


export const getProfile = createAsyncThunk("userSlice/getProfile", async(token) => {
  console.log(token);
   
  const { data } = await axios.get(
    "http://localhost:3001/api/v1/user/profile",
    {token},
    {
      headers: {
        "Content-Type": 'application/json',
        Authorization : `Bearer ${token}`
      }
    }
  );
  // console.log("data.body");
  return data.body;
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
