import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ThemeContext } from "../context/ThemeContext";

function Header() {
    const { itemCount } = useContext(CartContext);
    const { wishlistCount } = useContext(WishlistContext);
    const { dark, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <div className="logo-container">
                        <i className="fas fa-shopping-bag"></i>
                        <span className="logo-text">ShopHub</span>
                    </div>
                </Link>
                <nav className="nav-center">
                    <Link to="/">Home</Link>
                    <Link to="/wishlist" className="wishlist-nav" aria-label="Wishlist">
                        <i className="fas fa-heart"></i>
                        {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
                    </Link>
                    <Link to="/cart" className="cart-nav" aria-label="Shopping Cart">
                        <i className="fas fa-shopping-cart"></i>
                        {itemCount > 0 && <span className="badge">{itemCount}</span>}
                    </Link>
                </nav>
                <div className="nav-right">
                    <Link to="/signin" className="login-btn">
                        <i className="fas fa-user"></i> Login
                    </Link>
                    <Link to="/signup" className="register-btn">
                        Register
                    </Link>
                    <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle theme">
                        {dark ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
