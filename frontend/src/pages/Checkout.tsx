import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
    const { cart, clearCart } = useCart();
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    });
    const navigate = useNavigate();

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearCart();
        alert("Order placed! (Demo only)");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center py-8">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col md:flex-row gap-8">
                {/* Shipping Form */}
                <form
                    className="flex-1 flex flex-col gap-4"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <h2 className="text-2xl font-bold mb-2 text-blue-700">Shipping Details</h2>
                    <input
                        className="border rounded px-3 py-2 focus:outline-blue-400"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="border rounded px-3 py-2 focus:outline-blue-400"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        className="border rounded px-3 py-2 focus:outline-blue-400 resize-none"
                        name="address"
                        placeholder="Shipping Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        rows={3}
                    />
                    <input
                        className="border rounded px-3 py-2 focus:outline-blue-400"
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 text-white font-semibold rounded py-2 hover:bg-blue-700 transition"
                    >
                        Place Order
                    </button>
                </form>
                {/* Order Summary */}
                <div className="flex-1 bg-gray-50 rounded-xl p-4 shadow-inner">
                    <h2 className="text-xl font-bold mb-4 text-blue-700">Order Summary</h2>
                    <ul className="divide-y">
                        {cart.map(item => (
                            <li key={item.id} className="py-2 flex justify-between items-center">
                                <span>
                                    {item.name} <span className="text-gray-400">x{item.quantity}</span>
                                </span>
                                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};