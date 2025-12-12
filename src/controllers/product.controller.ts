import { Product } from "../models/product.model";
import { IProduct } from "../types/product";

const getProducts = async () =>{
    return await Product.find();
}

const createProduct = async (data:Omit<IProduct,"id">) =>{
    const product = Product.create(data);
    return product;
}

const getProductById = async (id: string) =>{
    return await Product.findById(id);
}

const updateProductById = async (id: string,data: Partial<{productName:string, productPrice: number}>) =>{
    return await Product.findByIdAndUpdate(id, data, {new: true});
}

const deleteProductById = async (id: string) =>{
    return await Product.findByIdAndDelete(id); 
}

export default {
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById   
}