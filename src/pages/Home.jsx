import { useState, useEffect, useMemo, useCallback } from "react";
import { getProducts } from "../services/api";
import Sidebar from "../components/Sidebar";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

function Home() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [sortBy, setSortBy] = useState("featured");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getProducts();
                setProducts(response.data);
            } catch (err) {
                setError("Failed to load products. Please try again later.");
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Extract unique categories from actual products
    const categories = useMemo(() => {
        const categorySet = new Set();
        products.forEach((product) => {
            const cat = typeof product.category === 'string'
                ? product.category
                : product.category?.name || product.category;
            if (cat) {
                categorySet.add(String(cat).trim());
            }
        });
        return Array.from(categorySet).sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        let filtered = products.filter((product) => {
            // Handle category - could be string or object
            const productCategory = typeof product.category === 'string'
                ? product.category
                : product.category?.name || product.category;

            // Normalize both for comparison (case-insensitive, trim whitespace)
            const normalizedProductCategory = String(productCategory).toLowerCase().trim();
            const normalizedSelected = String(selectedCategory).toLowerCase().trim();

            const categoryMatch =
                normalizedSelected === "all" || normalizedProductCategory === normalizedSelected;
            const searchMatch = product.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;

            return categoryMatch && searchMatch && priceMatch;
        });

        // Sort products
        if (sortBy === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
            const getRating = (product) => {
                return typeof product.rating === 'number' ? product.rating : product.rating?.rate || 0;
            };
            filtered.sort((a, b) => getRating(b) - getRating(a));
        }

        return filtered;
    }, [products, selectedCategory, searchTerm, priceRange, sortBy]);

    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
    }, []);

    const handlePriceChange = useCallback((range) => {
        setPriceRange(range);
    }, []);

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    const handleSort = useCallback((sort) => {
        setSortBy(sort);
    }, []);

    return (
        <div className="page">
            <Sidebar
                categories={categories}
                onCategoryChange={handleCategoryChange}
                onPriceChange={handlePriceChange}
            />

            <div className="products-section">
                <Banner />
                <SearchBar onSearch={handleSearch} onSort={handleSort} sortBy={sortBy} />

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading-spinner">
                        <p>Loading products...</p>
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <ProductList products={filteredProducts} />
                )}
            </div>
        </div>
    );
}

export default Home;
