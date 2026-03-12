import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import { Place } from './models/Place';

dotenv.config();

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const fetchWikiSummary = async (title: string) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}&format=json&origin=*`;
    const res = await axios.get(url, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'IndiaTravelApp/1.0 (https://your-website.com; contact@your-email.com)'
      }
    });
    const pages = res.data.query?.pages;
    if (pages) {
      const page: any = Object.values(pages)[0];
      if (page && page.extract) {
        const text = page.extract.trim();
        if (text.includes("may refer to") || text.includes("can refer to") || text.split(" ").length < 10) {
          return null;
        }
        return text;
      }
    }
  } catch (error) {
    console.error(`Error fetching Wikipedia summary for ${title}:`, (error as any).message);
  }
  return null;
};

const extractLegacy = (text: string) => {
  const patterns = [
    /built by ([^,.]+)/i,
    /commissioned by ([^,.]+)/i,
    /constructed by ([^,.]+)/i,
    /founded by ([^,.]+)/i,
    /under the reign of ([^,.]+)/i,
    /patronage of ([^,.]+)/i
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return "Local Heritage / Various";
};

const extractEntryTime = (text: string) => {
  const patterns = [
    /(\d{1,2}(?::\d{2})?\s?(?:AM|PM)\s?-\s?\d{1,2}(?::\d{2})?\s?(?:AM|PM))/i,
    /open from ([^.]+)/i,
    /timings are ([^.]+)/i
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return "9:00 AM - 6:00 PM (Typical)";
};

const extractTicketPrice = (text: string) => {
  const patterns = [
    /INR\s?(\d+)/i,
    /₹\s?(\d+)/i,
    /entrance fee of (\d+)/i,
    /ticket price is (\d+)/i
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const price = parseInt(match[1]);
      return isNaN(price) ? 0 : price;
    }
  }
  return 0; // Default to free or unknown
};

const fetchWikiHistory = async (title: string) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exchars=1200&titles=${encodeURIComponent(title)}&format=json&origin=*`;
    const res = await axios.get(url, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'IndiaTravelApp/1.0 (https://your-website.com; contact@your-email.com)'
      }
    });
    const pages = res.data.query?.pages;
    if (pages) {
      const page: any = Object.values(pages)[0];
      if (page && page.extract) {
        const text = page.extract.trim();
        if (text.includes("may refer to") || text.includes("can refer to") || text.split(" ").length < 10) {
          return null;
        }
        return text;
      }
    }
  } catch (error) {
    console.error(`Error fetching Wikipedia history for ${title}:`, (error as any).message);
  }
  return null;
};

const updatePlaceData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    const places = await Place.find({});
    console.log(`Found ${places.length} places to update.`);

    let updatedCount = 0;
    let failedCount = 0;

    for (const place of places) {
      console.log(`Processing [${updatedCount + failedCount + 1}/${places.length}]: ${place.name}...`);
      
      const summary = await fetchWikiSummary(place.name);
      await delay(200); // Respect API limits
      
      const details = await fetchWikiHistory(place.name);
      await delay(200);

      if (summary || details) {
        const updateData: any = {};
        if (summary) {
          // If summary is very long, we might want to truncate it for the "description" field
          updateData.description = summary.length > 500 ? summary.substring(0, 497) + '...' : summary;
          
          // Try to extract extra info from summary if not in details
          updateData.ruler = extractLegacy(summary);
          updateData.entryTime = extractEntryTime(summary);
          updateData.ticketPrice = extractTicketPrice(summary);
        }
        if (details) {
          // History can be longer
          updateData.history = details;
          
          // Refine extra info from details if needed
          const detailsLegacy = extractLegacy(details);
          if (detailsLegacy !== "Local Heritage / Various") updateData.ruler = detailsLegacy;
          
          const detailsTime = extractEntryTime(details);
          if (detailsTime !== "9:00 AM - 6:00 PM (Typical)") updateData.entryTime = detailsTime;
          
          const detailsPrice = extractTicketPrice(details);
          if (detailsPrice !== 0) updateData.ticketPrice = detailsPrice;
        }

        await Place.findByIdAndUpdate(place._id, updateData);
        updatedCount++;
        console.log(`Successfully updated ${place.name}`);
      } else {
        failedCount++;
        console.log(`Could not find Wikipedia data for ${place.name}`);
      }
    }

    console.log(`Update complete!`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Failed/No data: ${failedCount}`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

updatePlaceData();
