import express from 'express';
import { getRegions, getRegionById } from '../controllers/regionController';

const router = express.Router();

router.get('/', getRegions);
router.get('/:id', getRegionById);

export default router;
