import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API = "https://api.pujakaitem.com/api/products";
const initialState = {
	isLoading: false,
	isError: false,
	products: [],
	featureProducts: [],
};

export const getProducts = createAsyncThunk("products/getProducts", async () => {
	try {
		const res = await axios.get(API);
		const products = await res.data;
		return products;
	} catch (error) {
		return error.message;
	}
});

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				const featureData = action.payload.filter((feature) => feature.featured === true);
				state.isLoading = false;
				state.products = state.products.concat(action.payload);
				state.featureProducts = state.featureProducts.concat(featureData);
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload;
			});
	},
});
export default productSlice.reducer;
