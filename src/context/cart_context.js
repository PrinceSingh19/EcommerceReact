import { useReducer, useContext, createContext } from "react";
import reducer from "../reducer/cartReducer";
const CartContext = createContext();
const initialState = {
	cart: [],
	total_item: "",
	total_amount: "",
	shipping_fee: 50000,
};
const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const addToCart = (id, color, amount, product) => {
		dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
	};
	const removeFromCart = (id) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
	};
	return (
		<CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
};
const useCartContext = () => useContext(CartContext);
export { CartProvider, useCartContext };
