import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  regionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true },
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

export const Place = mongoose.model('Place', placeSchema);
