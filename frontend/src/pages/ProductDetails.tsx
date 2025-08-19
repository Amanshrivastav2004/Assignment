import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Dummy data (should match ProductListing)
const products = [
    {
        id: 1,
        name: "Product A",
        image: "https://via.placeholder.com/400",
        price: 29.99,
        rating: 4.5,
        category: "Electronics",
        popularity: 100,
        description: "This is a detailed description of Product A. It is a great electronic product.",
        reviews: [
            { user: "Alice", comment: "Great product!", rating: 5 },
            { user: "Bob", comment: "Good value for money.", rating: 4 }
        ]
    },
    {
        id: 2,
        name: "Product B",
        image: "https://via.placeholder.com/400",
        price: 19.99,
        rating: 4.0,
        category: "Books",
        popularity: 80,
        description: "This is a detailed description of Product B. A must-read book.",
        reviews: [
            { user: "Charlie", comment: "Very interesting read.", rating: 4 }
        ]
    },
    {
        id: 3,
        name: "Product C",
        image: "https://via.placeholder.com/400",
        price: 49.99,
        rating: 5.0,
        category: "Electronics",
        popularity: 120,
        description: "This is a detailed description of Product C. Top-rated electronic item.",
        reviews: [
            { user: "Dave", comment: "Absolutely love it!", rating: 5 }
        ]
    },
    {
        id: 4,
        name: "Product D",
        image: "https://via.placeholder.com/400",
        price: 59.99,
        rating: 4.0,
        category: "Electronics",
        popularity: 100,
        description: "This is a detailed description of Product D. Reliable and efficient.",
        reviews: [
            { user: "Eve", comment: "Works as expected.", rating: 4 }
        ]
    }
];

export const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => navigate("/")}
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-md p-4 sm:p-8">
                <div className="flex-shrink-0 flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-xs h-auto rounded-lg object-cover"
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
                    <div className="text-yellow-500 mb-2">Rating: {product.rating} ⭐</div>
                    <div className="text-gray-700 text-lg mb-4">Price: <span className="font-semibold">${product.price.toFixed(2)}</span></div>
                    <div className="mb-4 text-gray-600">{product.description}</div>
                    <button
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
                        onClick={() =>
                            addToCart({
                                id: product.id,
                                name: product.name,
                                image: product.image,
                                price: product.price,
                            })
                        }
                    >
                        Add to Cart
                    </button>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                        <div className="space-y-2">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review, idx) => (
                                    <div key={idx} className="border rounded p-2 bg-gray-50">
                                        <div className="font-medium">{review.user}</div>
                                        <div className="text-yellow-500 text-sm">Rating: {review.rating} ⭐</div>
                                        <div className="text-gray-700">{review.comment}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">No reviews yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                onClick={() => navigate("/")}
            >
                Back to Products
            </button>
        </div>
    );
};