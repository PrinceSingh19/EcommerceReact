import axios from "axios";
import { useReducer, useEffect, useContext, createContext } from "react";
import reducer from "../reducer/productReducer";

const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";
const intialState = {
	isLoading: false,
	isError: false,
	products: [],
	featureProducts: [],
	isSingleLoading: false,
	singleProduct: {},
};
const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, intialState);

	//api call for initial product fetching
	const getProducts = async (url) => {
		dispatch({ type: "SET_LOADING" });
		try {
			const res = await axios.get(url);
			const products = await res.data;
			console.log(products);
			dispatch({ type: "MY_API_DATA", payload: products });
		} catch (error) {
			dispatch({ type: "API_ERROR" });
		}
	};

	//api call for single product fetching based on query received
	const getSingleProduct = async (url) => {
		dispatch({ type: "SET_SINGLE_LOADING" });
		try {
			const res = await axios.get(url);
			const singleProduct = await res.data;
			console.log(singleProduct);
			dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
		} catch (error) {
			dispatch({ type: "SET_SINGLE_ERROR" });
		}
	};
	useEffect(() => {
		getProducts(API);
	}, []);

	return (
		<AppContext.Provider value={{ ...state, getSingleProduct }}>{children}</AppContext.Provider>
	);
};
//custom hooks
const useProductContext = () => {
	return useContext(AppContext);
};

export { AppContext, useProductContext, AppProvider };
