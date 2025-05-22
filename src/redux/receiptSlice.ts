// features/receipts/receiptSlice.ts
import { createSlice, createAsyncThunk,  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
interface Receipt {
  receiptId: string;
  receiptUrl: string;
  title: string;
  uploadedAt: string;
}

interface UploadReceiptResponse {
  message: string;
  receiptId: string;
  title: string;
  receiptUrl: string;
}

interface ReceiptState {
  receipts: Receipt[];
  uploadedReceipt: UploadReceiptResponse | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Initial State
const initialState: ReceiptState = {
  receipts: [],
  uploadedReceipt: null,
  loading: false,
  error: null,
  success: false
};

// === Thunk: Upload Receipt ===
export const uploadReceipt = createAsyncThunk<
  UploadReceiptResponse,
  FormData,
  { rejectValue: string }
>('receipts/upload', async (formData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await axios.post<UploadReceiptResponse>('http://localhost:9000/api/v1/items/upload-receipt', formData, config);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Upload failed');
  }
});

// === Thunk: Fetch All Receipts ===
export const fetchReceipts = createAsyncThunk<
  Receipt[],
  void,
  { rejectValue: string }
>('receipts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await axios.get<{
      message: string;
      count: number;
      receipts: Receipt[];
    }>('http://localhost:9000/api/v1/items/get-receipt', config);
    return response.data.receipts;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch receipts');
  }
});

// === Slice ===
const receiptSlice = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    resetReceiptState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.uploadedReceipt = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Upload Receipt
      .addCase(uploadReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadReceipt.fulfilled, (state, action: PayloadAction<UploadReceiptResponse>) => {
        state.loading = false;
        state.success = true;
        state.uploadedReceipt = action.payload;

       const newReceipt: Receipt = {
        receiptId: action.payload.receiptId,
        title: action.payload.title, // ✅ Set title
        receiptUrl: action.payload.receiptUrl,
        uploadedAt: new Date().toISOString(),
        };

        state.receipts.unshift(newReceipt);

      })
      .addCase(uploadReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Upload failed';
      })

      // Fetch Receipts
      .addCase(fetchReceipts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceipts.fulfilled, (state, action: PayloadAction<Receipt[]>) => {
        state.loading = false;
        state.receipts = action.payload;
      })
      .addCase(fetchReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load receipts';
      });
  }
});

export const { resetReceiptState } = receiptSlice.actions;
export default receiptSlice.reducer;
