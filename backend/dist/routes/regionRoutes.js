"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const regionController_1 = require("../controllers/regionController");
const router = express_1.default.Router();
router.get('/', regionController_1.getRegions);
router.get('/:id', regionController_1.getRegionById);
exports.default = router;
