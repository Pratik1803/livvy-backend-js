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
exports.User = void 0;
const validator_1 = __importDefault(require("validator"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    aws_uid: {
        type: String,
        default: "",
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    fullname: {
        type: String,
        trim: true,
    },
    userType: {
        type: String,
        required: true,
        trim: true,
        default: "USER",
    },
    roomId: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: String,
        unique: true,
        trim: true,
        validate(contact) {
            if (!validator_1.default.isMobilePhone(contact.toString())) {
                throw new Error(`${contact} is invalid!`);
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(email) {
            if (!validator_1.default.isEmail(email)) {
                throw new Error(`${email} is invalid!`);
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    profileImg: {
        type: String,
        trim: true,
        default: "",
    },
    contactVerified: {
        type: Boolean,
        required: true,
        trim: true,
        default: false,
    },
    emailVerified: {
        type: Boolean,
        required: true,
        trim: true,
        default: false,
    },
    houseNo: {
        type: String,
        trim: true,
        default: "",
    },
    street: {
        type: String,
        trim: true,
        default: "",
    },
    landmark: {
        type: String,
        trim: true,
        default: "",
    },
    area: {
        type: String,
        trim: true,
        default: "",
    },
    city: {
        type: String,
        trim: true,
        default: "",
    },
    state: {
        type: String,
        trim: true,
        default: "",
    },
    country: {
        type: String,
        trim: true,
        default: "",
    },
    pincode: {
        type: Number,
        trim: true,
        default: 0,
    },
    followingIds: {
        type: [String],
        default: [],
    },
    followerIds: {
        type: [String],
        default: [],
    },
    browsingEntries: {
        type: [String],
        default: [],
    },
    clickstreams: {
        type: [String],
        default: [],
    },
    cardHolderName: {
        type: String,
        default: "",
    },
    cardNumber: {
        type: String,
        default: "",
    },
    pin: {
        type: String,
        default: "",
    },
    cvv: {
        type: String,
        default: "",
    },
    upiId: {
        type: String,
        default: "",
    },
    soldProducts: {
        type: [String],
        default: [],
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isModified("password")) {
                this.password = yield bcryptjs_1.default.hash(this.password, 10);
                next();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
});
exports.User = mongoose_1.default.model("user", userSchema);
