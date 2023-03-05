"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_util_1 = require("./logger.util");
const generateToken = (uid) => {
    const secret = process.env.JWT_SECRET_KEY;
    try {
        if (!secret)
            throw new Error("No secret key available!");
        const jwtToken = jsonwebtoken_1.default.sign(uid, secret);
        return jwtToken;
    }
    catch (error) {
        logger_util_1.logger.error("Error in generating token: " + error);
    }
};
exports.generateToken = generateToken;
