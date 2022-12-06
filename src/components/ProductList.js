import React from "react";
import styled from "styled-components";
import { useProductContext } from "../context/productcontext";
import Product from "./Product";

const ProductList = () => {
	const { products } = useProductContext();

	return (
		<div className="grid grid-three-column">
			{products.map((currElem, index) => {
				return <Product key={currElem.id} {...currElem} />;
			})}
		</div>
	);
};

export default ProductList;
