import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";

function Wishlist() {
    const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);

    const handleAddToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
        showToast(`✅ ${product.title.substring(0, 20)}... moved to cart!`, "success");
    };

    const handleRemove = (product) => {
        removeFromWishlist(product.id);
        showToast("Removed from wishlist", "info");
    };

    const handleClearWishlist = () => {
        clearWishlist();
        showToast("Wishlist cleared", "info");
    };

    return (
        <main className="wishlist-page">
            <div className="wishlist-container">
                <h1><i className="fas fa-heart mr-3 text-secondary"></i>My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="empty-wishlist">
                        <i className="fas fa-heart-broken"></i>
                        <h2>Your wishlist is empty</h2>
                        <p>Add items to your wishlist to view them here</p>
                        <Link to="/" className="continue-shopping">
                            <i className="fas fa-arrow-left mr-2"></i>Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="wishlist-header">
                            <p className="wishlist-count">
                                <i className="fas fa-bookmark mr-2 text-secondary"></i>
                                {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} in your wishlist
                            </p>
                            <button onClick={handleClearWishlist} className="clear-wishlist">
                                <i className="fas fa-trash-alt mr-2"></i>Clear Wishlist
                            </button>
                        </div>

                        <div className="wishlist-items">
                            {wishlist.map((product) => (
                                <div key={product.id} className="wishlist-item">
                                    <Link to={`/product/${product.id}`} className="wishlist-image-link">
                                        <img src={product.thumbnail || product.image || product.images?.[0]} alt={product.title} />
                                    </Link>

                                    <div className="wishlist-info">
                                        <h3>
                                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                                        </h3>
                                        <p className="wishlist-category">
                                            <i className="fas fa-tag mr-2"></i>
                                            {typeof product.category === 'string'
                                                ? product.category
                                                : product.category?.name || 'Product'}
                                        </p>
                                        <div className="wishlist-rating">
                                            <span className="stars"><i className="fas fa-star text-yellow-400 mr-1"></i>{typeof product.rating === 'number' ? product.rating : product.rating?.rate || 0}</span>
                                            <span className="reviews">({Math.round((typeof product.rating === 'number' ? product.rating : product.rating?.rate || 0) * 10)})</span>
                                        </div>
                                        <div className="wishlist-price"><i className="fas fa-dollar-sign mr-1"></i>{product.price.toFixed(2)}</div>
                                    </div>

                                    <div className="wishlist-actions">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="add-to-cart-btn"
                                            aria-label={`Add ${product.title} to cart`}
                                        >
                                            <i className="fas fa-shopping-cart mr-2"></i>Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleRemove(product)}
                                            className="remove-btn"
                                            aria-label={`Remove ${product.title} from wishlist`}
                                            title="Remove from wishlist"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default Wishlist;
