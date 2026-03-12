import { Request, Response } from 'express';
import { Place } from '../models/Place';
import { AuthRequest } from '../middleware/authMiddleware';
import { Review } from '../models/Review';

export const getPlacesByRegion = async (req: Request, res: Response) => {
  try {
    const places = await Place.find({ regionId: req.params.regionId });
    res.json(places);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlaceById = async (req: Request, res: Response) => {
  try {
    const place = await Place.findById(req.params.id).populate('regionId', 'name type');
    if (place) {
      res.json(place);
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlaceReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ placeId: req.params.placeId }).populate('userId', 'name');
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addPlaceReview = async (req: AuthRequest, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const placeId = req.params.placeId;

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const review = await Review.create({
      placeId: String(placeId),
      userId: req.user.id,
      rating: Number(rating),
      comment
    });

    const populatedReview = await Review.findById(review._id).populate('userId', 'name');
    res.status(201).json(populatedReview);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
