import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();
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
const FilterContextProvider = ({ children }) => {
	const { products } = useProductContext();
	const [state, dispatch] = useReducer(reducer, initialState);

	//to set grid view
	const setGridView = () => {
		return dispatch({ type: "SET_GRID_VIEW" });
	};

	//to set list view
	const setListView = () => {
		return dispatch({ type: "SET_LIST_VIEW" });
	};

	// sorting the values in grid view or list view based  on dropdown menu
	const sorting = (e) => {
		dispatch({ type: "GET_SORT_VALUE", payload: e.target.value });
	};

	// update the filter values
	const updateFilterValue = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
	};

	//to clear the filters
	const clearFilters = () => {
		dispatch({ type: "CLEAR_FILTERS" });
	};

	// to sort the product
	useEffect(() => {
		dispatch({ type: "FILTER_PRODUCTS" });
		dispatch({ type: "SORTING_PRODUCTS" });
	}, [products, state.sorting_value, state.filters]);

	// to load all the product for grid and list values
	useEffect(() => {
		dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
	}, [products]);
	return (
		<FilterContext.Provider
			value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters }}
		>
			{children}
		</FilterContext.Provider>
	);
};

const useFilterContext = () => {
	return useContext(FilterContext);
};
export { FilterContextProvider, useFilterContext };
