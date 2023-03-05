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
exports.sessionRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const liveSession_model_1 = require("../../models/liveSession.model");
const logger_util_1 = require("../../utils/logger.util");
const multer_1 = __importDefault(require("multer"));
const aws_config_1 = require("../../configs/aws.config");
const path_1 = __importDefault(require("path"));
const sessionRoute = express_1.default.Router();
exports.sessionRoute = sessionRoute;
sessionRoute.use(auth_middleware_1.authMiddleware);
// To create a session entry in database for every session that has been started.
sessionRoute.post("/session/create", (0, multer_1.default)().single("thumbnail"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionData = Object.assign({}, req.body);
    if (!req.file)
        throw new Error("Thumbnail is missing!");
    try {
        const url = yield (0, aws_config_1.uploadImage)(`user/${sessionData.hostId}/sessions/${sessionData.title}/thumbnail${path_1.default.extname(req.file.originalname)}`, req.file.buffer);
        sessionData.thumbnail = url;
        const session = new liveSession_model_1.LiveSession(sessionData);
        const result = yield session.save();
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        logger_util_1.logger.error(`Error in creating session entry: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}));
