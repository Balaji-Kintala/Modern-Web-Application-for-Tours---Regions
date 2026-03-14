"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const Region_1 = require("./models/Region");
const Place_1 = require("./models/Place");
dotenv_1.default.config();
const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];
const unionTerritories = [
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Lakshadweep", "Ladakh", "Puducherry"
];
const getWikiImage = async (title, fallbackKeywords = 'india,tourist') => {
    try {
        const res = await axios_1.default.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800`);
        const pages = res.data.query?.pages;
        if (pages) {
            const page = Object.values(pages)[0];
            if (page && page.thumbnail && page.thumbnail.source) {
                return page.thumbnail.source;
            }
        }
    }
    catch (error) {
        // Ignore error and fallthrough
    }
    return `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop`;
};
const placesList_1 = require("./placesList");
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const seedDatabase = async () => {
    try {
        const defaultImage = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop";
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        await Region_1.Region.deleteMany();
        await Place_1.Place.deleteMany();
        console.log('Cleared existing data');
        console.log('Creating regions & fetching images...');
        const insertedRegions = [];
        // Process regions sequentially to not overwhelm Wikipedia API
        for (const name of states) {
            let imageUrl = await getWikiImage(name + ' state India');
            if (imageUrl === defaultImage)
                imageUrl = await getWikiImage(name);
            await delay(200);
            const region = await Region_1.Region.create({ name, type: 'State', imageUrl });
            insertedRegions.push(region);
            console.log(`Created region: ${name}`);
        }
        for (const name of unionTerritories) {
            let imageUrl = await getWikiImage(name + ' India');
            if (imageUrl === defaultImage)
                imageUrl = await getWikiImage(name);
            await delay(200);
            const region = await Region_1.Region.create({ name, type: 'Union Territory', imageUrl });
            insertedRegions.push(region);
            console.log(`Created region: ${name}`);
        }
        console.log(`Inserted ${insertedRegions.length} regions`);
        console.log('Creating places & fetching images...');
        let placeCount = 0;
        for (const regionName of Object.keys(placesList_1.placesList)) {
            const region = insertedRegions.find(r => r.name === regionName);
            if (region) {
                const places = placesList_1.placesList[regionName];
                for (const placeName of places) {
                    const imageUrl = await getWikiImage(placeName);
                    await delay(200); // Respect API limits
                    await Place_1.Place.create({
                        regionId: region._id,
                        name: placeName,
                        district: "Various / Local",
                        description: `A renowned and culturally significant tourist attraction located in ${regionName}.`,
                        history: "An important landmark bearing deep historical, natural, or cultural significance.",
                        ruler: "Various / N/A",
                        geographicArea: regionName,
                        entryTime: "Typically 9:00 AM - 5:00 PM (Check local timings)",
                        ticketPrice: 0,
                        imageUrl
                    });
                    placeCount++;
                    console.log(`Created place: ${placeName} (${placeCount})`);
                }
            }
            else {
                console.warn(`Region not found in DB: ${regionName}`);
            }
        }
        console.log(`Database seeded successfully with ${placeCount} places and web images!`);
        process.exit();
    }
    catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
};
seedDatabase();
