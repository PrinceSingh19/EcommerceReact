import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
	isSingleLoading: false,
	singleProduct: {},
};

export const getSingleProduct = createAsyncThunk("singleProduct/getSingleProduct", async (url) => {
	try {
		const res = await axios.get(url);
		const singleProduct = await res.data;
		return singleProduct;
	} catch (error) {
		return error.message;
	}
});

export const singleProductSlice = createSlice({
	name: "singleProduct",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSingleProduct.pending, (state, action) => {
				state.isSingleLoading = true;
			})
			.addCase(getSingleProduct.fulfilled, (state, action) => {
				state.isSingleLoading = false;
				state.singleProduct = state.singleProduct.concat(action.payload);
			})
			.addCase(getSingleProduct.rejected, (state, action) => {
				state.isSingleLoading = false;
				state.isError = action.payload;
			});
	},
});
export default singleProductSlice.reducer;
