"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveSession = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const lsSchema = new mongoose_1.default.Schema({
    hostId: {
        type: String,
        required: true,
        trim: true,
    },
    productIds: {
        type: [String],
        trim: true,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    scheduled: {
        type: Boolean,
        required: true,
    },
    scheduledTime: {
        type: String,
    },
    // brandId: {
    // 	type: String,
    // 	required: true,
    // 	trim: true,
    // },
    // hmsUrl: {
    // 	type: String,
    // 	required: true,
    // 	trim: true,
    // },
    // createdOn: {
    // 	type: String,
    // 	required: true,
    // 	trim: true,
    // },
    // startedOn: {
    // 	type: String,
    // 	required: true,
    // 	trim: true,
    // },
    // endedOn: {
    // 	type: String,
    // 	required: true,
    // 	trim: true,
    // },
    // totalViews: {
    // 	type: Number,
    // 	default: 0,
    // 	trim: true,
    // },
    // likes: {
    // 	type: Number,
    // 	default: 0,
    // 	trim: true,
    // },
    // maxViewers: {
    // 	type: Number,
    // 	default: 0,
    // 	trim: true,
    // },
    // joinedUsers: {
    // 	type: [String],
    // 	default: [],
    // },
    // comments: {
    // 	type: [String],
    // 	default: [],
    // 	trim: true,
    // },
    // thumbnail: {
    // 	type: String,
    // 	required: true,
    // 	trim: true,
    // },
});
exports.LiveSession = mongoose_1.default.model("liveSession", lsSchema);
