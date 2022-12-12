import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./stateSlices/productsSlice";
import singleProductReducer from "./stateSlices/singleProduct";
import filterProductsReducer from "./stateSlices/filterProductsSlice";
import cartReducer from "./stateSlices/cartSlice";
export const store = configureStore({
	reducer: {
		products: productReducer,
		singleProduct: singleProductReducer,
		filterProducts: filterProductsReducer,
		cart: cartReducer,
	},
});
