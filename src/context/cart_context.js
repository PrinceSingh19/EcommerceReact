import { useEffect } from "react";
import { useReducer, useContext, createContext } from "react";
import reducer from "../reducer/cartReducer";
const CartContext = createContext();
const getLocalCartData = () => {
	let localCartData = localStorage.getItem("cartItem");
	if (localCartData === []) {
		return [];
	}
	return JSON.parse(localCartData);
};
const initialState = {
	cart: getLocalCartData(),
	total_item: "",
	total_amount: "",
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
		dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
	};
	//to clear items in cart
	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	//to add data in localStorage
	useEffect(() => {
		localStorage.setItem("cartItem", JSON.stringify(state.cart));
	}, [state.cart]);
	return (
		<CartContext.Provider value={{ ...state, addToCart, removeFromCart, clearCart }}>
			{children}
		</CartContext.Provider>
	);
};
const useCartContext = () => useContext(CartContext);
export { CartProvider, useCartContext };
