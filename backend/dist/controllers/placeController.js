"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlaceReview = exports.getPlaceReviews = exports.getPlaceById = exports.getPlacesByRegion = void 0;
const Place_1 = require("../models/Place");
const Review_1 = require("../models/Review");
const getPlacesByRegion = async (req, res) => {
    try {
        const places = await Place_1.Place.find({ regionId: req.params.regionId });
        res.json(places);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPlacesByRegion = getPlacesByRegion;
const getPlaceById = async (req, res) => {
    try {
        const place = await Place_1.Place.findById(req.params.id).populate('regionId', 'name type');
        if (place) {
            res.json(place);
        }
        else {
            res.status(404).json({ message: 'Place not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPlaceById = getPlaceById;
const getPlaceReviews = async (req, res) => {
    try {
        const reviews = await Review_1.Review.find({ placeId: req.params.placeId }).populate('userId', 'name');
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPlaceReviews = getPlaceReviews;
const addPlaceReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const placeId = req.params.placeId;
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const review = await Review_1.Review.create({
            placeId: String(placeId),
            userId: req.user.id,
            rating: Number(rating),
            comment
        });
        const populatedReview = await Review_1.Review.findById(review._id).populate('userId', 'name');
        res.status(201).json(populatedReview);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addPlaceReview = addPlaceReview;
