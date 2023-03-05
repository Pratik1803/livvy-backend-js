"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    productId: {
        type: String,
        required: true,
        trim: true,
    },
    cashfreeId: {
        type: String,
        required: true,
        trim: true,
    },
    // deliveryId:{
    //     type:String,
    //     required:true,
    //     trim:true
    // },
    sellerId: {
        type: String,
        required: true,
        trim: true,
    },
    cartId: {
        type: String,
        trim: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        // price of a single unit of product while purchased
        required: true,
        type: Number,
        trim: true,
    },
    totalUnits: {
        type: Number,
        required: true,
        trim: true,
    },
    totalAmt: {
        type: Number,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: String,
        required: true,
        trim: true,
    },
    updatedAt: {
        type: String,
        trim: true,
    },
    issue: {
        type: String,
        trim: true,
    },
    reason: {
        type: String,
        trim: true,
    },
    couponCode: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
        required: true,
    },
});
exports.Order = mongoose_1.default.model("order", orderSchema);
