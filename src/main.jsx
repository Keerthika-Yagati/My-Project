import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App-tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartContext";
import ThemeProvider from "./context/ThemeContext";
import WishlistProvider from "./context/WishlistContext";
import ToastProvider from "./context/ToastContext";
import ThemeContext from "./context/ThemeContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  </BrowserRouter>

);
