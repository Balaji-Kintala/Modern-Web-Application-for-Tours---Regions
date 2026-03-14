"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const placeSchema = new mongoose_1.default.Schema({
    regionId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Region', required: true },
    name: { type: String, required: true },
    district: { type: String },
    description: { type: String },
    history: { type: String },
    ruler: { type: String },
    geographicArea: { type: String },
    entryTime: { type: String },
    ticketPrice: { type: Number }, // 0 or null for free
    imageUrl: { type: String },
}, { timestamps: true });
exports.Place = mongoose_1.default.model('Place', placeSchema);
