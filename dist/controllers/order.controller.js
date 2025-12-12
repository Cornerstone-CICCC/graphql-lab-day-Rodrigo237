"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
const mongoose_1 = require("mongoose");
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    return orders;
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(id);
    return order;
});
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, customerId } = data;
    if (!mongoose_1.Types.ObjectId.isValid(productId) || !mongoose_1.Types.ObjectId.isValid(customerId)) {
        throw new Error('Invalid productId or customerId. Expecting a valid ObjectId string.');
    }
    const newOrder = new order_model_1.Order({
        productId: new mongoose_1.Types.ObjectId(productId),
        customerId: new mongoose_1.Types.ObjectId(customerId),
    });
    return yield newOrder.save();
});
const updateOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const update = Object.assign({}, data);
    if (data.productId) {
        if (!mongoose_1.Types.ObjectId.isValid(data.productId))
            throw new Error('Invalid productId');
        update.productId = new mongoose_1.Types.ObjectId(data.productId);
    }
    if (data.customerId) {
        if (!mongoose_1.Types.ObjectId.isValid(data.customerId))
            throw new Error('Invalid customerId');
        update.customerId = new mongoose_1.Types.ObjectId(data.customerId);
    }
    const order = yield order_model_1.Order.findByIdAndUpdate(data.id, data, { new: true });
    return order;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByIdAndDelete(id);
});
const getCustomersByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(productId))
        return [];
    const orders = yield order_model_1.Order.find({ productId: new mongoose_1.Types.ObjectId(productId) }).populate('customerId').lean();
    const customers = orders.map(order => order.customerId);
    return customers;
});
const getProductsByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(customerId))
        return [];
    const orders = yield order_model_1.Order.find({ customerId: new mongoose_1.Types.ObjectId(customerId) }).populate('productId').lean();
    const products = orders.map(order => order.productId);
    return products;
});
exports.default = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getCustomersByProductId,
    getProductsByCustomerId
};
