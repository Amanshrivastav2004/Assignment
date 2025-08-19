import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
            {cart.length === 0 ? (
                <div className="text-gray-500 text-center">
                    Your cart is empty.{" "}
                    <Link to="/" className="text-blue-600 underline">
                        Go shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-4 bg-white shadow-sm"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <div className="text-gray-700 mb-2">
                                    Price:{" "}
                                    <span className="font-medium">
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        onClick={() =>
                                            updateQuantity(item.id, item.quantity - 1)
                                        }
                                        aria-label="Decrease quantity"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        onClick={() =>
                                            updateQuantity(item.id, item.quantity + 1)
                                        }
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="font-semibold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    className="text-red-500 hover:underline text-sm"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end mt-4">
                        <div className="text-xl font-bold">
                            Subtotal: ${subtotal.toFixed(2)}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Link
                            to="/checkout"
                            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};