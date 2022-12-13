import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilterContext } from "../context/filter_context";
import {
	filterProducts,
	settingFilterProducts,
	sortedProducts,
} from "../redux/stateSlices/filterProductsSlice";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
	const { filter_products, grid_view, sorting_value, filters } = useSelector(
		(state) => state.filterProducts
	);
	const { products } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(settingFilterProducts());
	}, [filters, products]);

	useEffect(() => {
		dispatch(sortedProducts());
	}, [sorting_value]);
	useEffect(() => {
		dispatch(filterProducts(products));
	}, [products]);

	if (grid_view === true) {
		return <GridView products={filter_products} />;
	}
	if (grid_view === false) {
		return <ListView products={filter_products} />;
	}
	/* if(setGridView===false){
        return <ListView products={filter_products}/>
    } */
};

export default ProductList;
