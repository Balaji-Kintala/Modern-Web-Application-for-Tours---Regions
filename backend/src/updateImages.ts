import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Region } from './models/Region';

dotenv.config();

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to DB');

    const regions = await Region.find();
    let updatedCount = 0;

    for (const region of regions) {
      let imageName = region.name.replace(/\s+/g, '');
      
      // Special cases handling based on folder inspection
      if (region.name === 'Andhra Pradesh') {
        imageName = 'AndraPradesh'; // Filename provided is missing the 'h'
      } else if (region.name === 'Jammu and Kashmir') {
        imageName = 'Jammu and Kashmir'; // This one actually has spaces in the filename
      } else if (region.name === 'Andaman and Nicobar Islands') {
        imageName = 'AndamanAndNicobarIslands';
      } else if (region.name === 'Dadra and Nagar Haveli and Daman and Diu') {
        imageName = 'DadraAndNagarHaveliAndDamanAndDiu';
      }

      const imageUrl = `/images/${imageName}.png`;

      await Region.updateOne(
        { _id: region._id },
        { $set: { imageUrl: imageUrl } }
      );
      
      console.log(`Updated ${region.name} -> ${imageUrl}`);
      updatedCount++;
    }

    console.log(`\nSuccessfully updated ${updatedCount} regions.`);
  } catch (error) {
    console.error('Error updating images:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

updateImages();
