import React from "react";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useCartContext } from "../context/cart_context";
import FormatPrice from "../helpers/FormatPrice";
import { removeFromCart, setDecrease, setIncrease } from "../redux/stateSlices/cartSlice";
import CartAmountToggle from "./CartAmountToggle";

const CartItem = ({ id, name, image, color, price, amount }) => {
	const dispatch = useDispatch();
	return (
		<>
			<div className="cart_heading grid grid-five-column">
				<div className="cart-image--name">
					<div>
						<figure>
							<img src={image} alt={id} />
						</figure>
					</div>

					<div>
						<p>{name}</p>
						<div className="color-div">
							<p>color:</p>
							<div className="color-style" style={{ backgroundColor: color, color: color }}></div>
						</div>
					</div>
				</div>

				{/*  price */}
				<div className="cart-hide">
					<p>
						<FormatPrice price={price} />
					</p>
				</div>

				{/* Quantity */}
				<CartAmountToggle
					amount={amount}
					setDecrease={() => dispatch(setDecrease(id))}
					setIncrease={() => dispatch(setIncrease(id))}
				/>

				{/* SubTotal */}
				<div className="cart-hide">
					<p>
						<FormatPrice price={price * amount} />
					</p>
				</div>

				<div>
					<FaTrash className="remove_icon" onClick={() => dispatch(removeFromCart(id))} />
				</div>
			</div>
		</>
	);
};

export default CartItem;
