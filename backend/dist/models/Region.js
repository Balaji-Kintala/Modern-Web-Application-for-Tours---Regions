"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const regionSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['State', 'Union Territory'], required: true },
    imageUrl: { type: String },
    description: { type: String },
}, { timestamps: true });
exports.Region = mongoose_1.default.model('Region', regionSchema);
