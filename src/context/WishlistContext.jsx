import { createContext, useState, useCallback } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem("wishlist");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const addToWishlist = useCallback((product) => {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.find((item) => item.id === product.id);
            let updatedWishlist;

            if (exists) {
                updatedWishlist = prevWishlist.filter((item) => item.id !== product.id);
            } else {
                updatedWishlist = [...prevWishlist, product];
            }

            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    }, []);

    const removeFromWishlist = useCallback((productId) => {
        setWishlist((prevWishlist) => {
            const updatedWishlist = prevWishlist.filter((item) => item.id !== productId);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    }, []);

    const isInWishlist = useCallback((productId) => {
        return wishlist.some((item) => item.id === productId);
    }, [wishlist]);

    const clearWishlist = useCallback(() => {
        setWishlist([]);
        localStorage.removeItem("wishlist");
    }, []);

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
                wishlistCount: wishlist.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistProvider;
