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
const product_model_1 = require("../models/product.model");
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find();
});
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = product_model_1.Product.create(data);
    return product;
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(id);
});
const updateProductById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndUpdate(id, data, { new: true });
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndDelete(id);
});
exports.default = {
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
};
