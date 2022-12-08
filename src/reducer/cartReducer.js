import React from "react";

const cartReducer = (state, action) => {
	//to add items in cart
	console.log(state.cart);
	if (action.type === "ADD_TO_CART") {
		let { id, amount, color, product } = action.payload;
		const { name, price } = product;
		//finding existing product
		let existingProduct = state.cart.find((currElem) => currElem.id === id + color);
		if (existingProduct) {
			let updatedProuduct = state.cart.map((currElem) => {
				if (currElem.id === id + color) {
					let newAmount = currElem.amount + amount;
					if (newAmount >= currElem.max) {
						newAmount = currElem.max;
					}
					return {
						...currElem,
						amount: newAmount,
					};
				} else {
					return currElem;
				}
			});
			return {
				...state,
				cart: updatedProuduct,
			};
		} else {
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
	}
	// to remove items from cart
	if (action.type === "REMOVE_FROM_CART") {
		let { id } = action.payload;
		return {
			...state,
			cart: state.cart.filter((x) => x.id !== id),
		};
	}
	//to clear the cart item
	if (action.type === "CLEAR_CART") {
		return {
			...state,
			cart: [],
		};
	}
	return state;
};

export default cartReducer;
