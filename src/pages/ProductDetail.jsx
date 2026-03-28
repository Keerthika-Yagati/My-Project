import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getProductById(id);
                setProduct(response.data);
                setQuantity(1);
            } catch (err) {
                setError("Failed to load product details. Please try again.");
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        alert(`Added ${quantity} item(s) to cart!`);
    };

    if (loading) {
        return (
            <div className="detail-page">
                <div className="loading-spinner">
                    <p>Loading product details...</p>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="detail-page">
                <div className="error-message">
                    {error || "Product not found"}
                </div>
                <Link to="/" className="back-link">
                    ← Back to Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="detail-page">
            <Link to="/" className="back-link">
                ← Back to Catalog
            </Link>

            <article className="product-detail">
                <div className="detail-image">
                    <img src={product.thumbnail || product.image || product.images?.[0]} alt={product.title} />
                </div>

                <div className="detail-content">
                    <p className="detail-category">
                        {typeof product.category === 'string'
                            ? product.category
                            : product.category?.name || 'Product'}
                    </p>
                    <h1 className="detail-title">{product.title}</h1>

                    <div className="detail-rating">
                        <span className="stars">⭐ {typeof product.rating === 'number' ? product.rating : product.rating?.rate || 0}</span>
                        <span className="reviews">Based on {Math.round((typeof product.rating === 'number' ? product.rating : product.rating?.rate || 0) * 10)} reviews</span>
                    </div>

                    <p className="detail-description">{product.description}</p>

                    <div className="detail-price">
                        <span className="currency">$</span>
                        <span className="amount">{product.price.toFixed(2)}</span>
                    </div>

                    <div className="quantity-selector">
                        <label htmlFor="quantity">Quantity:</label>
                        <div className="quantity-input">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-btn"
                            aria-label="Add product to cart"
                        >
                            🛒 Add to Cart
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="continue-btn"
                        >
                            Continue Shopping
                        </button>
                    </div>

                    <div className="detail-info">
                        <h3>Product Information</h3>
                        <ul>
                            <li>
                                <strong>Category:</strong> {product.category}
                            </li>
                            <li>
                                <strong>Rating:</strong> {product.rating?.rate || "N/A"} / 5
                            </li>
                            <li>
                                <strong>Reviews:</strong> {product.rating?.count || "No"} customer reviews
                            </li>
                            <li>
                                <strong>Price:</strong> ${product.price.toFixed(2)}
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default ProductDetail;
