import { useReducer, useContext, createContext, useEffect } from "react";
import reducer from "../reducer/cartReducer";
const CartContext = createContext();
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
const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	//to add items in cart
	const addToCart = (id, color, amount, product) => {
		dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
	};
	//to remove items from cart
	const removeFromCart = (id) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: id });
	};
	//to clear items in cart
	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	//to increase the cart item amount
	const setIncrease = (id) => {
		dispatch({ type: "SET_INCREMENT", payload: id });
	};
	//to decrease the cart item amount
	const setDecrease = (id) => {
		dispatch({ type: "SET_DECREMENT", payload: id });
	};

	//to add data in localStorage
	useEffect(() => {
		/* dispatch({ type: "CART_ITEM_UPDATE" });
		dispatch({ type: "CART_PRICE_UPDATE" }); */
		dispatch({ type: "CART_TOTAL_PRICE_AMOUNT" });
		localStorage.setItem("cartItem", JSON.stringify(state.cart));
	}, [state.cart]);
	return (
		<CartContext.Provider
			value={{ ...state, addToCart, removeFromCart, clearCart, setDecrease, setIncrease }}
		>
			{children}
		</CartContext.Provider>
	);
};
const useCartContext = () => useContext(CartContext);
export { CartProvider, useCartContext };
