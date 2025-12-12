import { Order } from "../models/order.model";
import { IOrder } from "../types/order";
import mongoose, { Types } from "mongoose";

const getOrders = async () =>{
    const orders = await Order.find();
    return orders;
}

const getOrderById = async (id:string) =>{
    const order = await Order.findById(id);
    return order;
}

const createOrder = async (data: Omit<IOrder,"id">) =>{
    const { productId, customerId } = data;
    if (!Types.ObjectId.isValid(productId) || !Types.ObjectId.isValid(customerId)) {
        throw new Error('Invalid productId or customerId. Expecting a valid ObjectId string.');
    }
    const newOrder = new Order({
        productId: new Types.ObjectId(productId),
        customerId: new Types.ObjectId(customerId),
    });
    return await newOrder.save();
}

const updateOrder = async (data: Partial<IOrder>) =>{
    const update: any = { ...data };
    if (data.productId) {
        if (!Types.ObjectId.isValid(data.productId)) throw new Error('Invalid productId');
        update.productId = new Types.ObjectId(data.productId as string);
    }
    if (data.customerId) {
        if (!Types.ObjectId.isValid(data.customerId)) throw new Error('Invalid customerId');
        update.customerId = new Types.ObjectId(data.customerId as string);
    }
    const order = await Order.findByIdAndUpdate(data.id,data,{new:true});
    return order;
}

const deleteOrder = async (id:string) =>{
    return await Order.findByIdAndDelete(id);
}

const getCustomersByProductId = async (productId: string) => {
    if (!Types.ObjectId.isValid(productId)) return [];
    const orders = await Order.find({ productId: new Types.ObjectId(productId) }).populate('customerId').lean();
    const customers = orders.map(order => order.customerId);
    return customers;
}

const getProductsByCustomerId = async (customerId: string) => {
    if (!Types.ObjectId.isValid(customerId)) return [];
    const orders = await Order.find({ customerId: new Types.ObjectId(customerId) }).populate('productId').lean();
    const products = orders.map(order => order.productId);
    return products;
}

export default {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getCustomersByProductId,
    getProductsByCustomerId
}