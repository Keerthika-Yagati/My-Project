import ProductCard from "./ProductCard";

function ProductList({ products }) {
    if (!products || products.length === 0) {
        return <div className="no-products">No products found. Try a different search.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
