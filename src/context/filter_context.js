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

	useEffect(() => {
		dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
	}, [products]);
	return (
		<FilterContext.Provider value={{ ...state, setGridView, setListView }}>
			{children}
		</FilterContext.Provider>
	);
};

const useFilterContext = () => {
	return useContext(FilterContext);
};
export { FilterContextProvider, useFilterContext };
