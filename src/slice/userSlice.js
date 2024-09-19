import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  currentUser: {
},
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
      console.log(action)
    });
    builder.addCase(login.rejected, (state, action) => {
      state.token = null;
      state.error = "error";
      state.isLoggedIn = false;
      localStorage.clear();
    });
  },
});


export const login = createAsyncThunk("userSlice/login", async(userData) => {
  const { data } = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    userData
  );

  console.log(data);
  return data.body;
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
