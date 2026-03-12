import mongoose from 'mongoose';

const regionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['State', 'Union Territory'], required: true },
  imageUrl: { type: String },
  description: { type: String },
}, { timestamps: true });

export const Region = mongoose.model('Region', regionSchema);
