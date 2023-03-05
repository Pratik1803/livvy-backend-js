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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_model_1 = require("../../models/product.model");
const logger_util_1 = require("../../utils/logger.util");
const multer_1 = __importDefault(require("multer"));
const aws_config_1 = require("../../configs/aws.config");
const uuid_1 = require("uuid");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const productRoute = express_1.default.Router();
exports.productRoute = productRoute;
productRoute.use(auth_middleware_1.authMiddleware);
// Create Product
// Update Product info
// Delete Product
// Get Product info
productRoute.get("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query._id)
            throw new Error("product_id not found!");
        const product = yield product_model_1.Product.findById(req.query._id);
        if (!product)
            throw new Error("Product not found!");
        res.status(200).json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in getting product details: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}));
// Get products created/listed by user of user-id uid
productRoute.get("/product/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.uid)
            throw new Error("User id not found!");
        // logger.debug(req.query.uid);
        const products = yield product_model_1.Product.find({ sellerId: req.query.uid });
        res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in getting product of user: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}));
// To create product
productRoute.post("/product/list", (0, multer_1.default)().array("product_image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // logger.debug(req.body.color);
        if (!req.body.sellerId)
            throw new Error("No sellerId found for product!");
        if (!req.files)
            throw new Error("no images recieved for product!");
        let productDetails = Object.assign({}, req.body);
        productDetails.color = productDetails.color.split("#");
        productDetails.color.forEach((ele, index) => {
            if (!ele)
                return productDetails.color.splice(index, 1);
            // productDetails.color.splice(index, 1, ele.replace(" ", ""));
        });
        productDetails.size = productDetails.size.split("#");
        productDetails.size.forEach((ele, index) => {
            if (!ele)
                return productDetails.size.splice(index, 1);
            // productDetails.size.splice(index, 1, ele.replace(" ", ""));
        });
        const aws_pid = (0, uuid_1.v4)();
        const imageUrls = [];
        const images = req.files;
        for (let i = 0; i < images.length; i++) {
            const url = yield (0, aws_config_1.uploadImage)(`user/${productDetails.sellerId}/products/${aws_pid}/${images[i].originalname}`, images[i].buffer);
            imageUrls.push(url);
        }
        productDetails.images = imageUrls;
        productDetails.aws_pid = aws_pid;
        const product = new product_model_1.Product(productDetails);
        const result = yield product.save();
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in creating product: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}));
