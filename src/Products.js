import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FilterSection from "./components/FilterSection";
import ProductList from "./components/ProductList";
import Sort from "./components/Sort";
import {
	filterProducts,
	sortedProducts,
	settingFilterProducts,
} from "./redux/stateSlices/filterProductsSlice";

const Products = () => {
	const { sorting_value, filters, grid_view } = useSelector((state) => state.filterProducts);
	const { products } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(sortedProducts());
		dispatch(settingFilterProducts());
	}, [sorting_value, filters, products]);
	useEffect(() => {
		dispatch(filterProducts(products));
	}, [products]);
	return (
		<Wrapper>
			<div className="container grid grid-filter-column">
				<div>
					<FilterSection />
				</div>
				<section className="product-view--sort">
					<div className="sort-filter">
						<Sort />
					</div>
					<div className="main-product">
						<ProductList />
					</div>
				</section>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.grid-filter-column {
		grid-template-columns: 0.2fr 1fr;
	}

	@media (max-width: ${({ theme }) => theme.media.mobile}) {
		.grid-filter-column {
			grid-template-columns: 1fr;
		}
	}
`;

export default Products;
