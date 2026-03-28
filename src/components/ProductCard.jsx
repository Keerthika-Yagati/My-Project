import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ToastContext } from "../context/ToastContext";

function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);
    const { addToWishlist, isInWishlist } = useContext(WishlistContext);
    const { showToast } = useContext(ToastContext);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        showToast(`✅ ${product.title.substring(0, 20)}... added to cart!`, "success");
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        const isCurrentlyInWishlist = isInWishlist(product.id);
        addToWishlist(product);
        if (isCurrentlyInWishlist) {
            showToast(`❤️ Removed from wishlist`, "info");
        } else {
            showToast(`❤️ Added to wishlist!`, "success");
        }
    };

    const inWishlist = isInWishlist(product.id);

    return (
        <Link to={`/product/${product.id}`} className="card-link">
            <article className="card">
                <button
                    onClick={handleWishlist}
                    className={`wishlist-btn ${inWishlist ? "active" : ""}`}
                    aria-label={inWishlist ? `Remove from wishlist` : `Add to wishlist`}
                >
                    <i className={`fas fa-heart ${inWishlist ? "filled" : ""}`}></i>
                </button>
                <div className="card-image">
                    <img src={product.thumbnail || product.image} alt={product.title} loading="lazy" />
                </div>
                <div className="card-content">
                    <h4 className="card-title">{product.title.substring(0, 35)}...</h4>
                    <p className="card-category">
                        {typeof product.category === 'string'
                            ? product.category
                            : product.category?.name || 'Product'}
                    </p>
                    <div className="card-rating">
                        <span className="stars">⭐ {typeof product.rating === 'number' ? product.rating : product.rating?.rate || 0}</span>
                        <span className="reviews">({Math.round((typeof product.rating === 'number' ? product.rating : product.rating?.rate || 0) * 10)})</span>
                    </div>
                    <div className="card-footer">
                        <span className="price">${product.price.toFixed(2)}</span>
                        <button
                            onClick={handleAddToCart}
                            className="add-btn"
                            aria-label={`Add ${product.title} to cart`}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default ProductCard;
