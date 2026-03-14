"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegionById = exports.getRegions = void 0;
const Region_1 = require("../models/Region");
const getRegions = async (req, res) => {
    try {
        const type = req.query.type;
        const filter = type ? { type } : {};
        const regions = await Region_1.Region.find(filter).sort({ name: 1 });
        res.json(regions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRegions = getRegions;
const getRegionById = async (req, res) => {
    try {
        const region = await Region_1.Region.findById(req.params.id);
        if (region) {
            res.json(region);
        }
        else {
            res.status(404).json({ message: 'Region not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRegionById = getRegionById;
