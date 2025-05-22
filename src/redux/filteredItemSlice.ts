import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Item type
export interface Item {
  _id: string;
  name: string;
  category: string;
  capitalPrice: number;
  sellingPrice: number;
  quantity: number;
  used: number;
  remaining: number;
  datePurchased: string;
  image?: string | null;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// Query filter parameters
export interface FilterParams {
category?: string;
  from?: string;
  to?: string;
  minUsed?: number;
  maxUsed?: number;
  action?: 'DELETE' | 'CONSUME' | 'VIEW'; // optional values
}
export interface FilteredItem extends Item {
  deleted?: boolean;
  action?: 'DELETE' | 'CONSUME' | 'VIEW';
  deletedAt?: string;
  metadata?: any;
}

// Slice state
interface FilteredItemState {
  items: FilteredItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FilteredItemState = {
  items: [],
  loading: false,
  error: null
};

export const fetchFilteredItems =createAsyncThunk<
  FilteredItem[], 
  FilterParams,
  { rejectValue: string }
>('filteredItems/fetch', async (filters, thunkAPI) => {
  try {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.from) params.append('from', filters.from);
    if (filters.to) params.append('to', filters.to);
    if (filters.minUsed !== undefined) params.append('minUsed', filters.minUsed.toString());
    if (filters.maxUsed !== undefined) params.append('maxUsed', filters.maxUsed.toString());
    if (filters.action) params.append('action', filters.action);

    const response = await axios.get(`http://localhost:9000/api/v1/items/filter`, { params });
    return response.data.data as Item[];
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch filtered items');
  }
});

const filteredItemSlice = createSlice({
  name: 'filteredItems',
  initialState,
  reducers: {
    clearFilteredItems(state) {
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(fetchFilteredItems.fulfilled, (state, action: PayloadAction<FilteredItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    })
      .addCase(fetchFilteredItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error loading filtered items';
      });
  }
});

export const { clearFilteredItems } = filteredItemSlice.actions;

export default filteredItemSlice.reducer;
