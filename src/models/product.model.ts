import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from '../types/product';




const ProductSchema: Schema = new Schema<IProduct>({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
}, { timestamps: true });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);