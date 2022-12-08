import React from "react";

const cartReducer = (state, action) => {
	if (action.type === "ADD_TO_CART") {
		let { id, amount, color, product } = action.payload;
		const { name, price } = product;
		let cartProduct = {
			id: id + color,
			amount: amount,
			color: color,
			name: product.name,
			price: product.price,
			image: product.image[0].url,
			max: product.stock,
		};
		return {
			...state,
			cart: [...state.cart, cartProduct],
		};
	}
	return state;
};

export default cartReducer;
