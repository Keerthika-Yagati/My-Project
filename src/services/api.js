import axios from "axios";

const API = axios.create({
    baseURL: "https://dummyjson.com",
});

// DummyJSON returns products wrapped in a 'products' property
export const getProducts = async () => {
    const response = await API.get("/products?limit=100");
    return { data: response.data.products };
};

export const getProductById = async (id) => {
    const response = await API.get(`/products/${id}`);
    return { data: response.data };
};

export const getCategories = async () => {
    const response = await API.get("/products/categories");
    return { data: response.data };
};

