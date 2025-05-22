import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://coffeebean-inventory-backend.onrender.com";

// 🛡 Ensure cookies are sent in every axios request globally (can be overridden per request)
axios.defaults.withCredentials = true;

// Types
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
      const response = await axios.post(
        `${API_URL}/api/v1/auth/signup`,
        { name, email, password, confirmPassword },
        { withCredentials: true } // ✅ include credentials
      );
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
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        { email, password },
        { withCredentials: true } // ✅ critical for session cookie to be set
      );
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
      const response = await axios.post(
        `${API_URL}/api/v1/auth/forgotPassword`,
        { email },
        { withCredentials: true } // ✅ if backend uses session for forgot flow
      );
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
      const response = await axios.patch(
        `${API_URL}/api/v1/auth/resetPassword/${token}`,
        { password, confirmPassword },
        { withCredentials: true } // ✅ safer in case of session-required endpoint
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ data: { user: User }; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.message = "Signup successful!";
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Signup failed";
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ data: { user: User }; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.message = "Login successful!";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Forgot password failed";
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Reset password failed";
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
