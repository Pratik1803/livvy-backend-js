"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    categoryId: {
        type: String,
        trim: true,
    },
    brandId: {
        type: String,
        // required: true,
        trim: true,
    },
    sellerId: {
        type: String,
        required: true,
        trim: true,
    },
    aws_pid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    // status:{},
    description: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        // required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        required: true,
        trim: true,
    },
    subCategory: {
        type: String,
        trim: true,
    },
    slug: String,
    localDelivery: Number,
    provincialDelivery: Number,
    nationalDelivery: Number,
    warrantyType: String,
    warrantyPeriod: String,
    publishStatus: String,
    color: {
        type: [
            {
                type: String,
                trim: true,
            },
        ],
        required: true,
    },
    size: {
        type: [
            {
                type: String,
                trim: true,
            },
        ],
        required: true,
    },
    // unitSize: {
    // 	type: String,
    // 	required: true,
    // 	trim: true,
    // },
    // unitWeight: {
    // 	type: String,
    // 	required: true,
    // 	trim: true,
    // },
    likes: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
    reviews: [String],
    rating: {
        type: Number,
        required: true,
        trim: true,
        default: 0.0,
    },
});
exports.Product = mongoose_1.default.model("product", productSchema);
