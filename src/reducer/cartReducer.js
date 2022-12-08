import React from "react";

const cartReducer = (state, action) => {
	if (action.type === "ADD_TO_CART") {
		let { id, amount, color, product } = action.payload;
	}
};

export default cartReducer;
