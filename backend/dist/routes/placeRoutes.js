"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const placeController_1 = require("../controllers/placeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/region/:regionId', placeController_1.getPlacesByRegion);
router.get('/:id', placeController_1.getPlaceById);
router.get('/:placeId/reviews', placeController_1.getPlaceReviews);
router.post('/:placeId/reviews', authMiddleware_1.protect, placeController_1.addPlaceReview);
exports.default = router;
