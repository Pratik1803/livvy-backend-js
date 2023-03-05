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
exports.createRoom = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_util_1 = require("./logger.util");
function createRoom(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = {
                url: `${process.env.HMS_BASE_URL}/v2/rooms`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HMS_MANAGEMENT_TOKEN}`,
                },
                data,
            };
            const result = yield axios_1.default.request(config);
            return result.data;
        }
        catch (error) {
            logger_util_1.logger.error(`Err in creating room: ${error}`);
        }
    });
}
exports.createRoom = createRoom;
