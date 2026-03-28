import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
        useContext(CartContext);
    const { showToast } = useContext(ToastContext);

    const handleRemoveFromCart = (item) => {
        removeFromCart(item.id);
        showToast(`Removed from cart`, "info");
    };

    const handleClearCart = () => {
        clearCart();
        showToast("Cart cleared", "info");
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <h2><i className="fas fa-shopping-cart mr-3"></i>Your Shopping Cart</h2>
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        <i className="fas fa-inbox"></i>
                    </div>
                    <p>Your cart is empty</p>
                    <p className="text-gray-500 text-sm">Start adding products to fill your cart!</p>
                    <Link to="/" className="continue-shopping">
                        <i className="fas fa-arrow-left mr-2"></i>Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h2><i className="fas fa-shopping-cart mr-3"></i>Your Shopping Cart</h2>

            <div className="cart-container">
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="item-image">
                                <img src={item.thumbnail || item.image || item.images?.[0]} alt={item.title} />
                            </div>

                            <div className="item-details">
                                <h4>{item.title}</h4>
                                <p className="item-category">
                                    <i className="fas fa-tag mr-2"></i>
                                    {typeof item.category === 'string'
                                        ? item.category
                                        : item.category?.name || 'Product'}
                                </p>
                                <p className="item-price"><i className="fas fa-dollar-sign mr-1"></i>{item.price.toFixed(2)}</p>
                            </div>

                            <div className="item-quantity">
                                <label htmlFor={`qty-${item.id}`}>Quantity:</label>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        aria-label="Decrease quantity"
                                        title="Decrease"
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <input
                                        id={`qty-${item.id}`}
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        min="1"
                                    />
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        aria-label="Increase quantity"
                                        title="Increase"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="item-subtotal">
                                <p><i className="fas fa-dollar-sign mr-1"></i>{(item.price * item.quantity).toFixed(2)}</p>
                            </div>

                            <button
                                onClick={() => handleRemoveFromCart(item)}
                                className="remove-btn"
                                aria-label={`Remove ${item.title} from cart`}
                            >
                                <i className="fas fa-trash mr-2"></i>Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3><i className="fas fa-receipt mr-2"></i>Order Summary</h3>
                    <div className="summary-item">
                        <span>Subtotal:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span><i className="fas fa-truck mr-2"></i>Shipping:</span>
                        <span className="text-green-600 font-bold">Free</span>
                    </div>
                    <div className="summary-item">
                        <span><i className="fas fa-percent mr-2"></i>Tax (10%):</span>
                        <span>${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="summary-total">
                        <span>Total:</span>
                        <span>${(cartTotal * 1.1).toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn">
                        <i className="fas fa-credit-card mr-2"></i>Proceed to Checkout
                    </button>
                    <Link to="/" className="continue-shopping block text-center">
                        <i className="fas fa-arrow-left mr-2"></i>Continue Shopping
                    </Link>
                    <button onClick={handleClearCart} className="clear-cart-btn">
                        <i className="fas fa-trash-alt mr-2"></i>Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
