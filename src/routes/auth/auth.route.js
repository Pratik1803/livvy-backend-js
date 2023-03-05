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
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const user_model_1 = require("../../models/user.model");
const createRoom_util_1 = require("../../utils/createRoom.util");
const logger_util_1 = require("../../utils/logger.util");
const generateToken_util_1 = require("../../utils/generateToken.util");
const authRoute = express_1.default.Router();
exports.authRoute = authRoute;
authRoute.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password)
            throw new Error("Invalid credentials!");
        const user = yield user_model_1.User.findOne({ email: req.body.email });
        if (!user)
            throw new Error("User not found!");
        const passwordCheck = yield bcryptjs_1.default.compare(req.body.password, user.password);
        // logger.debug(`${passwordCheck} ${req.body.password} ${user.password}`);
        if (!passwordCheck)
            throw new Error("Incorrect password!");
        const token = (0, generateToken_util_1.generateToken)(user._id.toString());
        if (!token)
            throw new Error("Failed to generate token!");
        res.status(200).json({
            success: true,
            data: user,
            token,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in Logging In User: ${error}`);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}));
authRoute.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = req.body;
        userData.aws_uid = (0, uuid_1.v4)();
        // if (userData.type == "SELLER") {
        const room_data = yield (0, createRoom_util_1.createRoom)({
            name: userData.fullname,
            description: `Room for ${userData.fullname}`,
            region: "in",
            template_id: "63da65202c69be2b20650627",
        });
        userData.roomId = room_data.id;
        // }
        const user = new user_model_1.User(userData);
        const result = yield user.save();
        const token = (0, generateToken_util_1.generateToken)(result._id.toString());
        res.status(201).json({
            success: true,
            data: result,
            token,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in creating User: ${error}`);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}));
