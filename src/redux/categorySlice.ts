import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// fetchCategories thunk
export const fetchCategories = createAsyncThunk<string[], void, { rejectValue: string }>(
  'categories/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`https://coffeebean-inventory-backend.onrender.com/api/v1/items/categories`);
      return response.data.data; // assuming array of strings like ["books", "electronics"]
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Category slice
interface CategoryState {
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialCategoryState: CategoryState = {
  categories: [],
  loading: false,
  error: null
};

const categorySlice = createSlice({
  name: 'categories',
  initialState: initialCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error loading categories';
      });
  }
});

export default categorySlice.reducer;
