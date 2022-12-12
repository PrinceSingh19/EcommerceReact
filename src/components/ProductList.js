import React from "react";
import { useSelector } from "react-redux";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
	const { filter_products, grid_view } = useSelector((state) => state.filterProducts);

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
