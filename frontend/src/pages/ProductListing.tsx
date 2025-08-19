import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Dummy data for demonstration
const products = [
    {
        id: 1,
        name: "Product A",
        image: "https://via.placeholder.com/150",
        price: 29.99,
        rating: 4.5,
        category: "Electronics",
        popularity: 100,
    },
    {
        id: 2,
        name: "Product B",
        image: "https://via.placeholder.com/150",
        price: 19.99,
        rating: 4.0,
        category: "Books",
        popularity: 80,
    },
    {
        id: 3,
        name: "Product C",
        image: "https://via.placeholder.com/150",
        price: 49.99,
        rating: 5.0,
        category: "Electronics",
        popularity: 120,
    },
    {
        id: 4,
        name: "Product D",
        image: "https://via.placeholder.com/150",
        price: 59.99,
        rating: 4.0,
        category: "Electronics",
        popularity: 100,
    }
    // Add more products as needed
];

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

export const ProductListing = () => {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("price");
    const { cart, addToCart } = useCart();

    // Filter products by category
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "popularity") return b.popularity - a.popularity;
        return 0;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
            {/* Navbar */}
            <nav className="bg-gray-300 shadow sticky top-0 z-10 h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-blue-600 tracking-tight">ShopEase</span>
                    </Link>
                    <div className="flex gap-20 items-center">
                        <Link
                            to="/"
                            className="text-blue-600 hover:text-blue-800 font-medium transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/cart"
                            className="relative px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
                        >
                            Cart
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                {/* Filters and view controls */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        <label className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow">
                            <span className="font-medium text-gray-700">Category:</span>
                            <select
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                                className="border rounded px-2 py-1 focus:outline-blue-400"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </label>
                        <label className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow">
                            <span className="font-medium text-gray-700">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="border rounded px-2 py-1 focus:outline-blue-400"
                            >
                                <option value="price">Price</option>
                                <option value="popularity">Popularity</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView("grid")}
                            disabled={view === "grid"}
                            className={`px-4 py-2 rounded border transition-colors duration-200 font-semibold shadow-sm ${
                                view === "grid"
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                            }`}
                        >
                            <span className="inline-block align-middle mr-1">🔲</span> Grid
                        </button>
                        <button
                            onClick={() => setView("list")}
                            disabled={view === "list"}
                            className={`px-4 py-2 rounded border transition-colors duration-200 font-semibold shadow-sm ${
                                view === "list"
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                            }`}
                        >
                            <span className="inline-block align-middle mr-1">📋</span> List
                        </button>
                    </div>
                </div>

                {/* Main product display */}
                {view === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {sortedProducts.map(product => (
                            <div key={product.id} className="block group">
                                <div className="border rounded-2xl p-5 bg-white shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col items-center gap-4 h-full relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-32 h-32 object-cover rounded-xl mb-2 group-hover:scale-105 transition-transform"
                                    />
                                    <div className="flex-1 min-w-0 text-center">
                                        <h3 className="text-lg font-bold mb-1 text-gray-800 group-hover:text-blue-600 transition">{product.name}</h3>
                                        <div className="text-pink-600 text-xl font-bold mb-1">${product.price.toFixed(2)}</div>
                                        <div className="text-yellow-500 mb-1 font-semibold">{"★".repeat(Math.round(product.rating))}<span className="text-gray-400">{("★".repeat(5 - Math.round(product.rating)))}</span></div>
                                        <div className="text-gray-400 text-xs">{product.category}</div>
                                    </div>
                                    <span className="absolute top-3 right-3 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-semibold shadow">{product.popularity} sold</span>
                                    <div className="mt-2 flex gap-2">
                                        <Link to={`/product/${product.id}`} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">View</Link>
                                        <button
                                            onClick={() =>
                                                addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    image: product.image,
                                                    price: product.price,
                                                })
                                            }
                                            className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {sortedProducts.map(product => (
                            <div key={product.id} className="block group">
                                <div className="border rounded-2xl p-5 bg-white shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-28 h-28 object-cover rounded-xl mb-2 sm:mb-0 group-hover:scale-105 transition-transform"
                                    />
                                    <div className="flex-1 min-w-0 w-full sm:w-auto text-center sm:text-left">
                                        <h3 className="text-xl font-bold mb-1 text-gray-800 group-hover:text-blue-600 transition">{product.name}</h3>
                                        <div className="text-pink-600 text-lg font-bold mb-1">${product.price.toFixed(2)}</div>
                                        <div className="text-yellow-500 mb-1 font-semibold">{"★".repeat(Math.round(product.rating))}<span className="text-gray-400">{("★".repeat(5 - Math.round(product.rating)))}</span></div>
                                        <div className="text-gray-400 text-xs mb-2">{product.category}</div>
                                    </div>
                                    <span className="absolute top-3 right-3 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-semibold shadow">{product.popularity} sold</span>
                                    <div className="mt-2 flex gap-2">
                                        <Link to={`/product/${product.id}`} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">View</Link>
                                        <button
                                            onClick={() =>
                                                addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    image: product.image,
                                                    price: product.price,
                                                })
                                            }
                                            className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Footer */}
            <footer className="mt-16 py-6 bg-white shadow-inner text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </footer>
        </div>
    );
}