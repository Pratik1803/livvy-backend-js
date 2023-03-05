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
exports.authMiddleware = void 0;
const user_model_1 = require("../models/user.model");
const logger_util_1 = require("../utils/logger.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_secret = process.env.JWT_SECRET_KEY;
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!jwt_secret)
                throw new Error("JwtSecret not found!");
            if (!req.headers.authorization)
                throw new Error("auth-token not found!");
            const token = req.headers.authorization.split(" ")[1];
            const _id = jsonwebtoken_1.default.verify(token, jwt_secret);
            const user = yield user_model_1.User.findById(_id);
            if (!user)
                throw new Error("User not found!");
            // req.auth.user = user;
            next();
        }
        catch (error) {
            logger_util_1.logger.error(`Error in auth Middleware: ${error}`);
            res.status(401).json({
                success: false,
                message: `${error}`,
            });
        }
    });
}
exports.authMiddleware = authMiddleware;
