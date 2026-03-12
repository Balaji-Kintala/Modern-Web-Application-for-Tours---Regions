import { Request, Response } from 'express';
import { Region } from '../models/Region';

export const getRegions = async (req: Request, res: Response) => {
  try {
    const type = req.query.type;
    const filter = type ? { type } : {};
    const regions = await Region.find(filter).sort({ name: 1 });
    res.json(regions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRegionById = async (req: Request, res: Response) => {
  try {
    const region = await Region.findById(req.params.id);
    if (region) {
      res.json(region);
    } else {
      res.status(404).json({ message: 'Region not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
