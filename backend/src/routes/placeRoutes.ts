import express from 'express';
import { getPlacesByRegion, getPlaceById, getPlaceReviews, addPlaceReview } from '../controllers/placeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/region/:regionId', getPlacesByRegion);
router.get('/:id', getPlaceById);
router.get('/:placeId/reviews', getPlaceReviews);
router.post('/:placeId/reviews', protect, addPlaceReview);

export default router;
