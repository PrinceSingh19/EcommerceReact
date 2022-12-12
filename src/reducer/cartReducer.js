const cartReducer = (state, action) => {
	switch (action.type) {
		//to add items in cart
		case "ADD_TO_CART":
			let { id, amount, color, product } = action.payload;
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

		// to remove items from cart
		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: state.cart.filter((x) => x.id !== action.payload),
			};

		//to clear the cart item
		case "CLEAR_CART":
			return {
				...state,
				cart: [],
			};

		// to decrease the amount in cart item
		case "SET_DECREMENT":
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
			return {
				...state,
				cart: updatedProduct,
			};

		// to increase the amount in cart item
		case "SET_INCREMENT":
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
			return {
				...state,
				cart: incrementProduct,
			};

		case "CART_TOTAL_PRICE_AMOUNT":
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
			return {
				...state,
				total_item: total_item,
				total_price: total_price,
			};

		default:
			return state;
	}
};
/* 	if (action.type === "CART_ITEM_UPDATE") {
		let updateCartValue = state.cart.reduce((acc, curr) => {
			let { amount } = curr;
			acc = acc + amount;
			return acc;
		}, 0);
		console.log(updateCartValue);
		return {
			...state,
			total_item: updateCartValue,
		};
	}

	if (action.type === "CART_PRICE_UPDATE") {
		let totalUpdateValue = state.cart.reduce((acc, curr) => {
			let { amount, price } = curr;
			acc = acc + amount * price;
			return acc;
		}, 0);
		return {
			...state,
			total_price: totalUpdateValue,
		};
	} */
//instead of doing above two step the following can be reduced to one step
/* 	if (action.type === "CART_TOTAL_PRICE_AMOUNT") {
		
	}
	return state; */

export default cartReducer;
