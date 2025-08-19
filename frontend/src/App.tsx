import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProductListing } from './pages/ProductListing'
import { ProductDetails } from './pages/ProductDetails'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { CartProvider } from './context/CartContext'
import { useState } from "react";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
