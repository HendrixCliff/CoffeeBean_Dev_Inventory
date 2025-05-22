import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;


// 🧩 Item type definition
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
  image?: File | null;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// 🧩 State type definition
interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};



// ✅ Async thunks

// Fetch all user items
export const fetchItems = createAsyncThunk<Item[], void, { rejectValue: string }>(
  'items/fetchItems',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`https://coffeebean-inventory-backend.onrender.com/api/v1/items/`);
      return res.data.data as Item[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch items');
    }
  }
);

// Add a new item

export const addItem = createAsyncThunk<Item, FormData, { rejectValue: string }>(
  'items/addItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://coffeebean-inventory-backend.onrender.com/api/v1/items/', itemData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,  // ✅ Important for session-based auth
      });
      return response.data.data as Item;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error adding item');
    }
  }
);



// Consume an item
export const consumeItem = createAsyncThunk<Item, { id: string; amountUsed: number }, { rejectValue: string }>(
  'items/consumeItem',
  async ({ id, amountUsed }, thunkAPI) => {
    try {
      const res = await axios.patch(`https://coffeebean-inventory-backend.onrender.com/api/v1/items/${id}/consume`, { amountUsed });
      return res.data.data as Item;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to consume item');
    }
  }
);

// Delete an item
export const deleteItem = createAsyncThunk<string, string, { rejectValue: string }>(
  'items/deleteItem',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`https://coffeebean-inventory-backend.onrender.com/api/v1/items/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete item');
    }
  }
);

// 🧠 Slice definition
const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching items';
      })

      // Add
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error adding item';
      })
      // Consume
      .addCase(consumeItem.fulfilled, (state, action: PayloadAction<Item>) => {
        const updated = action.payload;
        const index = state.items.findIndex(item => item._id === updated._id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(consumeItem.rejected, (state, action) => {
        state.error = action.payload || 'Error consuming item';
      })

      // Delete
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.error = action.payload || 'Error deleting item';
      });
  },
});

export const { resetError } = itemSlice.actions;

export default itemSlice.reducer;
