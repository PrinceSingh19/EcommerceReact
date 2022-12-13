import { createSlice } from "@reduxjs/toolkit";

const getLocalCartData = () => {
	let localCartData = localStorage.getItem("cartItem");
	/* if (localCartData === []) {
		return [];
	}
	return JSON.parse(localCartData);  */
	const parsedData = JSON.parse(localCartData);
	if (!Array.isArray(parsedData)) return [];
	return parsedData;
};
const initialState = {
	cart: getLocalCartData(),
	total_item: "",
	total_price: "",
	shipping_fee: 50000,
};
// below in reducers I have added both the ways to update the state
// i.e. traditional redux way and new redux toolkit immer way

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			let { id, color, amount, product } = action.payload;
			console.log(action.payload);
			//finding existing product
			let existingProduct = state.cart.find((currElem) => currElem.id === id + color);
			if (existingProduct) {
				let updatedProuduct = state.cart.map((currElem) => {
					if (currElem.id === id + color) {
						let newAmount = currElem.amount + amount; //finding the new amount
						if (newAmount >= currElem.max) {
							//checking that endtered amount doesn't exceeds the stock limit
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
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter((x) => x.id !== action.payload);

			/* return {
				...state,
				cart: state.cart.filter((x) => x.id !== action.payload),
			}; */
		},
		clearCart: (state, action) => {
			state.cart = [];
			/* return {
				...state,
				cart: [],
			}; */
		},
		setIncrease: (state, action) => {
			let incrementProduct = state.cart.map((currElem) => {
				if (currElem.id === action.payload) {
					let incAmount = currElem.amount + 1;
					if (incAmount > currElem.max) {
						incAmount = currElem.max;
					}
					return {
						...currElem,
						amount: incAmount,
					};
				} else {
					return {
						...currElem,
					};
				}
			});

			state.cart = incrementProduct;
			/* return {
				...state,
				cart: incrementProduct,
			}; */
		},
		setDecrease: (state, action) => {
			let updatedProduct = state.cart.map((currElem) => {
				if (currElem.id === action.payload) {
					let decAmount = currElem.amount - 1;
					if (decAmount <= 1) {
						decAmount = 1;
					}
					return {
						...currElem,
						amount: decAmount,
					};
				} else {
					return {
						...currElem,
					};
				}
			});
			state.cart = updatedProduct;
			/* return {
				...state,
				cart: updatedProduct,
			}; */
		},
		cartTotalPriceAmount: (state, action) => {
			let { total_item, total_price } = state.cart.reduce(
				(acc, curr) => {
					let { amount, price } = curr;
					acc.total_item += amount;
					acc.total_price += amount * price;
					return acc;
				},
				{
					total_item: 0,
					total_price: 0,
				}
			);
			state.total_item = total_item;
			state.total_price = total_price;
			/* return {
				...state,
				total_item: total_item,
				total_price: total_price,
			}; */
		},
	},
});
export const {
	addToCart,
	removeFromCart,
	setDecrease,
	setIncrease,
	cartTotalPriceAmount,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
