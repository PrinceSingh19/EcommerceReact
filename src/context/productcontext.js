import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";
const AppProvider = ({ children }) => {
	const getProducts = async (url) => {
		const res = await axios.get(url);
		const products = await res.data;
		console.log(products);
	};
	useEffect(() => {
		getProducts(API);
	}, []);

	return <AppContext.Provider value="prince">{children}</AppContext.Provider>;
};

const useProductContext = () => {
	return useContext(AppContext);
};

export { AppContext, useProductContext, AppProvider };
