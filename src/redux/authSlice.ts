import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/v1/auth";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  message: null,
};

// ==================== Async Thunks ====================

// Signup
export const signup = createAsyncThunk<
  { data: { user: User }; token: string },
  { name: string; email: string; password: string; confirmPassword: string },
  { rejectValue: { message: string } }
>(
  "auth/signup",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Login
export const login = createAsyncThunk<
  { data: { user: User }; token: string },
  { email: string; password: string },
  { rejectValue: { message: string } }
>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: { message: string } }
>(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgotPassword`, { email });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk<
  { message: string },
  { token: string; password: string; confirmPassword: string },
  { rejectValue: { message: string } }
>(
  "auth/resetPassword",
  async ({ token, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/resetPassword/${token}`, {
        password,
        confirmPassword,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ==================== Slice ====================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<{ data: { user: User }; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.token;
      state.message = "Signup successful!";
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || "Signup failed";
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ data: { user: User }; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.token;
      state.message = "Login successful!";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || "Login failed";
    });

    // Forgot Password
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || "Forgot password failed";
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || "Reset password failed";
    });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
