import { useState, useEffect } from "react";

function SearchBar({ onSearch, onSort, sortBy }) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClear = () => {
        setSearchTerm("");
    };

    const handleSort = (e) => {
        onSort(e.target.value);
    };

    return (
        <div className="search-section">
            <div className="search-bar">
                <i className="fas fa-search"></i>
                <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={handleChange}
                    aria-label="Search products"
                />
                {searchTerm && (
                    <button onClick={handleClear} className="clear-btn" aria-label="Clear search">
                        ✕
                    </button>
                )}
            </div>

            <div className="sort-container">
                <label htmlFor="sort-select">
                    <i className="fas fa-sort"></i>
                </label>
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={handleSort}
                    className="sort-select"
                    aria-label="Sort products"
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>
        </div>
    );
}

export default SearchBar;
