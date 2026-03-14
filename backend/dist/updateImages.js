"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Region_1 = require("./models/Region");
dotenv_1.default.config();
const updateImages = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        const regions = await Region_1.Region.find();
        let updatedCount = 0;
        for (const region of regions) {
            let imageName = region.name.replace(/\s+/g, '');
            // Special cases handling based on folder inspection
            if (region.name === 'Andhra Pradesh') {
                imageName = 'AndraPradesh'; // Filename provided is missing the 'h'
            }
            else if (region.name === 'Jammu and Kashmir') {
                imageName = 'Jammu and Kashmir'; // This one actually has spaces in the filename
            }
            else if (region.name === 'Andaman and Nicobar Islands') {
                imageName = 'AndamanAndNicobarIslands';
            }
            else if (region.name === 'Dadra and Nagar Haveli and Daman and Diu') {
                imageName = 'DadraAndNagarHaveliAndDamanAndDiu';
            }
            const imageUrl = `/images/${imageName}.png`;
            await Region_1.Region.updateOne({ _id: region._id }, { $set: { imageUrl: imageUrl } });
            console.log(`Updated ${region.name} -> ${imageUrl}`);
            updatedCount++;
        }
        console.log(`\nSuccessfully updated ${updatedCount} regions.`);
    }
    catch (error) {
        console.error('Error updating images:', error);
    }
    finally {
        mongoose_1.default.connection.close();
        process.exit(0);
    }
};
updateImages();
