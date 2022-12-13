import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filter_products: [],
	all_products: [],
	grid_view: true,
	sorting_value: "lowest",
	filters: {
		text: "",
		category: "all",
		company: "all",
		color: "all",
		maxPrice: 0,
		price: 0,
		minPrice: 0,
	},
};
// Below I have added both the ways to update state i.e. traditional redux way and newly immer way of redux toolkit

export const filterProductsSlice = createSlice({
	name: "filterProducts",
	initialState,
	reducers: {
		filterProducts: (state, action) => {
			console.log(state.filter_products);

			let priceArr = action.payload.map((currElem) => currElem.price);
			//1st way
			/* let maxPrice = priceArr.reduce((acc, curr) => {
				if (curr > acc) {
					acc = curr;
				}
				return acc;
			}, 0); */
			//2nd way
			let maximumPrice = priceArr.reduce((acc, curr) => Math.max(acc, curr), 0);
			//3rd way
			//let maxPrice = Math.max(...priceArr);

			state.filter_products = [...action.payload];
			state.all_products = [...action.payload];
			state.filters.maxPrice = maximumPrice;
			state.filters.price = maximumPrice;
			/* return {
				...state,
				filter_products: [...action.payload],
				all_products: [...action.payload],
				filters: {
					...state.filters,
					maxPrice: maxPrice,
					price: maxPrice,
				},
			}; */
		},
		sortedProducts: (state, action) => {
			let newSortData;
			const { filter_products, sorting_value } = state;
			let tempSortProduct = [...filter_products];

			const sortingProducts = (a, b) => {
				if (sorting_value === "a-z") {
					return a.name.localeCompare(b.name);
				}
				if (sorting_value === "z-a") {
					return b.name.localeCompare(a.name);
				}
				if (sorting_value === "lowest") {
					return a.price - b.price;
				}
				if (sorting_value === "highest") {
					return b.price - a.price;
				}
			};

			newSortData = tempSortProduct.sort(sortingProducts);
			state.filter_products = newSortData;
			/* return {
				...state,
				filter_products: newSortData,
			}; */
		},
		setGridView: (state) => {
			state.grid_view = true;
		},
		setListView: (state) => {
			state.grid_view = false;
		},
		sorting: (state, action) => {
			state.sorting_value = action.payload;
		},
		updateFilterValue: (state, action) => {
			const { name, value } = action.payload;
			state.filters[name] = value;
			/* return {
				...state,
				filters: {
					...state.filters,
					[name]: value,
				},
			}; */
		},
		clearFilters: (state, action) => {
			state.filters.text = "";
			state.filters.category = "all";
			state.filters.company = "all";
			state.filters.color = "all";
			state.filters.price = state.filters.maxPrice;
			/* return {
				...state,
				filters: {
					...state.filters,
					text: "",
					category: "all",
					company: "all",
					color: "all",
					maxPrice: state.filters.maxPrice,
					price: state.filters.maxPrice,
					minPrice: state.filters.minPrice,
				},
			}; */
		},
		settingFilterProducts: (state, action) => {
			let { all_products } = state;
			let tempFilterProduct = [...all_products];

			const { text, category, company, color, price } = state.filters;

			if (text) {
				tempFilterProduct = tempFilterProduct.filter((curElem) => {
					return curElem.name.toLowerCase().includes(text);
				});
			}

			if (category !== "all") {
				tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.category === category);
			}

			if (company !== "all") {
				tempFilterProduct = tempFilterProduct.filter(
					(curElem) => curElem.company.toLowerCase() === company.toLowerCase()
				);
			}

			if (color !== "all") {
				tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.colors.includes(color));
			}

			if (price === 0) {
				tempFilterProduct = tempFilterProduct.filter((currElem) => currElem.price === price);
			} else {
				tempFilterProduct = tempFilterProduct.filter((currElem) => currElem.price <= price);
			}
			state.filter_products = tempFilterProduct;
			/* return {
				...state,
				filter_products: tempFilterProduct,
			}; */
		},
	},
});

export const {
	filterProducts,
	setGridView,
	setListView,
	sorting,
	updateFilterValue,
	clearFilters,
	sortedProducts,
	settingFilterProducts,
} = filterProductsSlice.actions;

export default filterProductsSlice.reducer;
