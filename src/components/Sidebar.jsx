import { useState } from "react";

function Sidebar({ categories = [], onCategoryChange, onPriceChange }) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onCategoryChange(category);
    };

    const handlePriceChange = () => {
        onPriceChange({ min: minPrice, max: maxPrice });
    };

    const handleResetFilters = () => {
        setSelectedCategory("all");
        setMinPrice(0);
        setMaxPrice(1000);
        onCategoryChange("all");
        onPriceChange({ min: 0, max: 1000 });
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <h3>Categories</h3>
                <div className="category-list">
                    <button
                        className={`category-btn ${selectedCategory === "all" || selectedCategory.toLowerCase().trim() === "all" ? "active" : ""}`}
                        onClick={() => handleCategoryClick("all")}
                    >
                        All Products
                    </button>

                    {categories.length === 0 ? (
                        <p className="loading">No categories available</p>
                    ) : (
                        categories.map((category) => {
                            // Handle category as string or object
                            const categoryName = typeof category === 'string' ? category : category.name || category;
                            const categoryKey = typeof category === 'string' ? category : category.slug || category.name;
                            const normalizedName = String(categoryName).toLowerCase().trim();
                            const normalizedSelected = String(selectedCategory).toLowerCase().trim();
                            const isActive = normalizedSelected === normalizedName;

                            return (
                                <button
                                    key={categoryKey}
                                    className={`category-btn ${isActive ? "active" : ""}`}
                                    onClick={() => handleCategoryClick(categoryName)}
                                >
                                    {typeof categoryName === 'string'
                                        ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                                        : 'Category'
                                    }
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="sidebar-section">
                <h3>Price Range</h3>
                <div className="price-filter">
                    <div className="price-inputs">
                        <div className="price-input-group">
                            <label htmlFor="min-price">Min: ${minPrice}</label>
                            <input
                                id="min-price"
                                type="range"
                                min="0"
                                max="1000"
                                value={minPrice}
                                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                                onMouseUp={handlePriceChange}
                                onTouchEnd={handlePriceChange}
                            />
                        </div>
                        <div className="price-input-group">
                            <label htmlFor="max-price">Max: ${maxPrice}</label>
                            <input
                                id="max-price"
                                type="range"
                                min="0"
                                max="1000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                onMouseUp={handlePriceChange}
                                onTouchEnd={handlePriceChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleResetFilters} className="reset-filters-btn">
                <i className="fas fa-redo"></i> Reset Filters
            </button>
        </aside>
    );
}

export default Sidebar;
