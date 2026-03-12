import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Region } from './models/Region';
import { Place } from './models/Place';

dotenv.config();

const mappings: Record<string, Record<string, string>> = {
  "Andhra Pradesh": {
    "Tirumala Venkateswara Temple": "1.1.jpeg",
    "Borra Caves": "1.2.jpg",
    "Araku Valley": "1.3.jpg",
    "Rishikonda Beach": "1.4.jpg",
    "Undavalli Caves": "1.5.jpg",
    "Kailasagiri": "1.6.jpg",
    "Simhachalam Temple": "1.7.png",
    "Belum Caves": "1.8.jpg",
    "Lepakshi": "1.9.jpg",
    "Amaravati Stupa": "1.10.webp"
  },
  "Arunachal Pradesh": {
    "Tawang Monastery": "2.1.cms",
    "Ziro Valley": "2.2.cms",
    "Sela Pass": "2.3.avif",
    "Namdapha National Park": "2.4.webp",
    "Bomdila Monastery": "2.5.jpg",
    "Dirang Valley": "2.6.jpg",
    "Pankang Teng Tso Lake": "2.7.avif",
    "Madhuri Lake": "2.8.avif",
    "Itanagar Fort": "2.9.avif",
    "Mehao Wildlife Sanctuary": "2.10.jpg"
  },
  "Assam": {
    "Kaziranga National Park": "3.1.jpg",
    "Kamakhya Temple": "3.2.webp",
    "Majuli Island": "3.3.jpg",
    "Manas National Park": "3.4.webp",
    "Umananda Temple": "3.5.webp",
    "Kakochang Waterfalls": "3.6.jpg",
    "Pobitora Wildlife Sanctuary": "3.7.webp",
    "Dibru-Saikhowa National Park": "3.8.webp",
    "Agnigarh": "3.9.jpg",
    "Haflong Hill": "3.10.avif"
  },
  "Bihar": {
    "Mahabodhi Temple": "4.1.webp",
    "Nalanda University Ruins": "4.2.jpg",
    "Gaya": "4.3.avif",
    "Vishnupad Temple": "4.4.webp",
    "Vikramshila Ruins": "4.5.jpg",
    "Rajgir Hot Springs": "4.6.jpg",
    "Griddhakuta Peak": "4.7.jpg",
    "Jalmandir": "4.8.jpg",
    "Golghar": "4.9.webp",
    "Barabar Caves": "4.10.avif"
  },
  "Chhattisgarh": {
    "Chitrakote Waterfalls": "5.1.jpg",
    "Bhoramdeo Temple": "5.2.jpg",
    "Sirpur": "5.3.jpg",
    "Kanger Valley National Park": "5.4.avif",
    "Tirathgarh Falls": "5.5.jpg",
    "Maitri Bagh": "5.6.jpg",
    "Mainpat": "5.7.webp",
    "Dongargarh": "5.8.jpg",
    "Rajim": "5.9.jpg",
    "Kailash and Kutumsar Caves": "5.10.png"
  },
  "Goa": {
    "Basilica of Bom Jesus": "6.1.webp",
    "Dudhsagar Falls": "6.2.jpg",
    "Palolem Beach": "6.3.webp",
    "Baga Beach": "6.4.jpg",
    "Aguada Fort": "6.5.webp",
    "Anjuna Beach": "6.6.jpg",
    "Chapora Fort": "6.7.jpg",
    "Vagator Beach": "6.8.jpg",
    "Se Cathedral": "6.9.jpg",
    "Mangueshi Temple": "6.10.jpg"
  },
  "Gujarat": {
    "Statue of Unity": "7.1.webp",
    "Gir National Park": "7.2.webp",
    "Rann of Kutch": "7.3.jpg",
    "Somnath Temple": "7.4.jpg",
    "Dwarkadhish Temple": "7.5.jpg",
    "Sabarmati Ashram": "7.6.jpg",
    "Sun Temple, Modhera": "7.7.jpg",
    "Rani ki Vav": "7.8.avif",
    "Laxmi Vilas Palace": "7.9.jpg",
    "Akshardham Temple": "7.10.jpg"
  },
  "Haryana": {
    "Brahma Sarovar": "8.1.avif",
    "Sultanpur National Park": "8.2.webp",
    "Pinjore Gardens": "8.3.webp",
    "Kurukshetra Panorama": "8.4.jpg",
    "Surajkund": "8.5.jpg",
    "Morni Hills": "8.6.jpg",
    "Badkhal Lake": "8.7",
    "Tilyar Lake": "8.8.jpg",
    "Bhindawas Bird Sanctuary": "8.9.jpeg",
    "Sheikh Chilli Tomb": "8.10.jpg"
  },
  "Himachal Pradesh": {
    "Rohtang Pass": "9.1.jpg",
    "Shimla Ridge": "9.2.jpg",
    "Spiti Valley": "9.3.avif",
    "Solang Valley": "9.4.jpg",
    "Hidimba Devi Temple": "9.5.jpg",
    "Dalhousie": "9.6.jpg",
    "Khajjiar": "9.7.jpg",
    "Dharamshala": "9.8.jpg",
    "Triund": "9.9.jpg",
    "Kinnaur": "9.10.jpg"
  },
  "Jharkhand": {
    "Baidyanath Temple": "10.1.jpg",
    "Hundru Falls": "10.2.jpg",
    "Betla National Park": "10.3.avif",
    "Dassam Falls": "10.4.jpg",
    "Jonha Falls": "10.5.jpg",
    "Jagannath Temple Ranchi": "10.6.jpg",
    "Pahari Mandir": "10.7.jpg",
    "Dalma Wildlife Sanctuary": "10.8.jpg",
    "Jubilee Park": "10.9.jpg",
    "Parasnath Hill": "10.10.jpg"
  },
  "Karnataka": {
    "Mysore Palace": "11.1.jpg",
    "Hampi Monuments": "11.2.avif",
    "Coorg": "11.3.jpg",
    "Gokarna": "11.4.jpg",
    "Jog Falls": "11.5.jpg",
    "Bandipur National Park": "11.6.jpg",
    "Lalbagh Botanical Garden": "11.7.jpg",
    "Pattadakal": "11.8.jpg",
    "Chikmagalur": "11.9.jpg",
    "Badami Caves": "11.10.jpg"
  },
  "Kerala": {
    "Munnar": "12.1.jpg",
    "Alleppey Backwaters": "12.2.webp",
    "Wayanad": "12.3.jpg",
    "Padmanabhaswamy Temple": "12.4.jpg",
    "Kochi Fort": "12.5.jpg",
    "Thekkady": "12.6.webp",
    "Varkala Beach": "12.7.jpg",
    "Athirappilly Waterfalls": "12.8.jpg",
    "Kumarakom Bird Sanctuary": "12.9.jpg",
    "Bekal Fort": "12.10.jpg"
  },
  "Madhya Pradesh": {
    "Khajuraho Temples": "13.1.cms",
    "Sanchi Stupa": "13.2.webp",
    "Bandhavgarh National Park": "13.3.jpg",
    "Gwalior Fort": "13.4.webp",
    "Kanha National Park": "13.5.jpg",
    "Bhedaghat": "13.6.webp",
    "Ujjain Mahakaleshwar": "13.7.jpg",
    "Pachmarhi": "13.8.jpg",
    "Bhimbetka Rock Shelters": "13.9.jpg",
    "Mandu": "13.10.avif"
  },
  "Maharashtra": {
    "Gateway of India": "14.1.jpg",
    "Ajanta and Ellora Caves": "14.2.webp",
    "Mahabaleshwar": "14.3.jpg",
    "Lonavala": "14.4.avif",
    "Elephanta Caves": "14.5.jpg",
    "Shirdi": "14.6.jpg",
    "Tadoba Andhari Tiger Reserve": "14.7.jpg",
    "Panchgani": "14.8.jpg",
    "Pratapgad Fort": "14.9.jpg",
    "Marine Drive": "14.10.jpg"
  },
  "Manipur": {
    "Loktak Lake": "15.1.png",
    "Kangla Fort": "15.2.webp",
    "Keibul Lamjao National Park": "15.3.jpg",
    "Shree Govindajee Temple": "15.4.jpg",
    "INA Memorial": "15.5.jpg",
    "Khongjom War Memorial": "15.6.jpg",
    "Sadu Chiru Waterfall": "15.7.webp",
    "Dzukou Valley (Manipur side)": "15.8.jpg",
    "Manipur State Museum": "15.9.jpg",
    "Khangkhui Cave": "15.10.jpg"
  },
  "Meghalaya": {
    "Living Root Bridges": "16.1.jpg",
    "Nohkalikai Falls": "16.2.jpg",
    "Mawlynnong Village": "16.3.jpg",
    "Umiam Lake": "16.4.jpg",
    "Elephant Falls": "16.5.jpg",
    "Dawki River": "16.6.jpg",
    "Shillong Peak": "16.7.jpg",
    "Laitlum Canyons": "16.8.jpg",
    "Mawsmai Cave": "16.9.jpg",
    "Cherrapunji": "16.10.webp"
  },
  "Mizoram": {
    "Phawngpui": "17.1.jpg",
    "Vantawng Falls": "17.2.jpg",
    "Reiek Tlang": "17.3.jpg",
    "Solomon's Temple": "17.4.jpg",
    "Durtlang Hills": "17.5.jpg",
    "Falkawn Village": "17.6.jpg",
    "Tam Dil Lake": "17.7.jpg",
    "Mizoram State Museum": "17.8.jpg",
    "Lushai Hills": "17.9.jpg",
    "Murlen National Park": "17.10.jpg"
  },
  "Nagaland": {
    "Dzukou Valley": "18.1.webp",
    "Kisama Heritage Village": "18.2.jpg",
    "Japfu Peak": "18.3.jpg",
    "Kachari Ruins": "18.4.jpg",
    "Shilloi Lake": "18.5.jpg",
    "Kohima War Cemetery": "18.6.jpg",
    "Mokokchung": "18.7.jpg",
    "Tuophema Village": "18.8.jpg",
    "Intanki National Park": "18.9.webp",
    "Mount Saramati": "18.10.cms"
  },
  "Odisha": {
    "Konark Sun Temple": "19.1.webp",
    "Jagannath Temple": "19.2.webp",
    "Chilika Lake": "19.3.webp",
    "Lingaraja Temple": "19.4.png",
    "Udayagiri and Khandagiri Caves": "19.5.webp",
    "Dhauli Shanti Stupa": "19.6.jpg",
    "Simlipal National Park": "19.7.jpg",
    "Bhitarkanika National Park": "19.8.avif",
    "Cuttack Chandi Temple": "19.9.webp",
    "Chandipur Beach": "19.10.jpg"
  },
  "Punjab": {
    "Golden Temple": "20.1.webp",
    "Jallianwala Bagh": "20.2.jpg",
    "Wagah Border": "20.3.jpg",
    "Anandpur Sahib": "20.4.jpg",
    "Qila Mubarak": "20.5.webp",
    "Virasat-e-Khalsa": "20.6.jpg",
    "Sheesh Mahal": "20.7.avif",
    "Moti Bagh Palace": "20.8.jpg",
    "Akal Takht": "20.9.webp",
    "Gobindgarh Fort": "20.10.jpg"
  },
  "Rajasthan": {
    "Hawa Mahal": "21.1.jpg",
    "Mehrangarh Fort": "21.2.jpg",
    "Udaipur City Palace": "21.3.jpg",
    "Amer Fort": "21.4.webp",
    "Jaisalmer Fort": "21.5.jpg",
    "Ranthambore National Park": "21.6.jpg",
    "Pushkar Lake": "21.7.jpg",
    "Jantar Mantar": "21.8.jpg",
    "Lake Pichola": "21.9.jpg",
    "Chittorgarh Fort": "21.10.avif"
  },
  "Sikkim": {
    "Nathu La": "22.1.avif",
    "Rumtek Monastery": "22.2.jpg",
    "Gurudongmar Lake": "22.3.jpg",
    "Tsomgo Lake": "22.4.jpg",
    "Pelling": "22.5.cms",
    "Yumthang Valley": "22.6.jpg",
    "Namchi": "22.7.jpg",
    "Ravangla": "22.8.jpg",
    "Zuluk": "22.9.jpg",
    "Kanchenjunga National Park": "22.10.jpg"
  },
  "Tamil Nadu": {
    "Meenakshi Temple": "23.1.avif",
    "Brihadisvara Temple": "23.2.webp",
    "Marina Beach": "23.3.avif",
    "Ooty": "23.4.jpg",
    "Rameswaram Temple": "23.5.jpg",
    "Kanyakumari": "23.6.jpg",
    "Mahabalipuram": "23.7.webp",
    "Kodaikanal": "23.8.avif",
    "Mudumalai National Park": "23.9.webp",
    "Vivekananda Rock Memorial": "23.10.webp"
  },
  "Telangana": {
    "Charminar": "24.1.jpg",
    "Golconda Fort": "24.2.jpg",
    "Ramappa Temple": "24.3.webp",
    "Hussain Sagar": "24.4.jpg",
    "Salar Jung Museum": "24.5.jpg",
    "Chowmahalla Palace": "24.6.png",
    "Warangal Fort": "24.7.webp",
    "Thousand Pillar Temple": "24.8.jpg",
    "Bhongir Fort": "24.9.avif",
    "Nehru Zoological Park": "24.10.jpg"
  },
  "Tripura": {
    "Neermahal": "25.1.webp",
    "Ujjayanta Palace": "25.2.jpg",
    "Unakoti": "25.3.webp",
    "Tripura Sundari Temple": "25.4.jpg",
    "Sepahijala Wildlife Sanctuary": "25.5.jpg",
    "Jampui Hill": "25.6.webp",
    "Heritage Park": "25.7.jpg",
    "Pilak": "25.8.jpg",
    "Deotamura": "25.9.jpg",
    "Dumboor Lake": "25.10.avif"
  },
  "Uttar Pradesh": {
    "Taj Mahal": "26.1.jpeg",
    "Varanasi Ghats": "26.2.jpg",
    "Fatehpur Sikri": "26.3.jpg",
    "Agra Fort": "26.4.jpg",
    "Kashi Vishwanath Temple": "26.5.jpg",
    "Sarnath": "26.6.jpg",
    "Ram Janmabhoomi": "26.7.jpg",
    "Bara Imambara": "26.8.webp",
    "Triveni Sangam": "26.9.jpg",
    "Dudhwa National Park": "26.10.avif"
  },
  "Uttarakhand": {
    "Badrinath Temple": "27.1.webp",
    "Valley of Flowers": "27.2.jpg",
    "Nainital Lake": "27.3.jpg",
    "Kedarnath Temple": "27.4.png",
    "Rishikesh": "27.5.jpg",
    "Har Ki Pauri": "27.6.webp",
    "Jim Corbett National Park": "27.7.jpg",
    "Mussoorie": "27.8.jpg",
    "Auli": "27.9.webp",
    "Gangotri Temple": "27.10.jpg"
  },
  "West Bengal": {
    "Victoria Memorial": "28.1.jpg",
    "Sundarbans National Park": "28.2.jpg",
    "Darjeeling Himalayan Railway": "28.3.jpg",
    "Howrah Bridge": "28.4.jpg",
    "Dakshineswar Kali Temple": "28.5.jpg",
    "Belur Math": "28.6.jpg",
    "Digha Beach": "28.7.jpg",
    "Hazarduari Palace": "28.8.webp",
    "Indian Museum": "28.9.jpg",
    "Tiger Hill": "28.10.jpg"
  },
  "Andaman and Nicobar Islands": {
    "Cellular Jail": "29.1.jpg",
    "Radhanagar Beach": "29.2.jpg",
    "Ross Island": "29.3.jpg",
    "Havelock Island": "29.4.jpg",
    "Baratang Island": "29.5.webp",
    "Neil Island": "29.6.webp",
    "Mahatma Gandhi Marine National Park": "29.7.jpg",
    "Chidiya Tapu": "29.8.avif",
    "Viper Island": "29.9.jpg",
    "Mount Harriet": "29.10.jpg"
  },
  "Chandigarh": {
    "Rock Garden of Chandigarh": "30.1.jpg",
    "Sukhna Lake": "30.2.jpg",
    "Rose Garden": "30.3.jpg",
    "Capitol Complex": "30.4.jpg",
    "Pinjore Gardens": "30.5.webp",
    "Government Museum and Art Gallery": "30.6.jpg",
    "Le Corbusier Centre": "30.7.jpg",
    "ChattBir Zoo": "30.8.webp",
    "Japanese Garden": "30.9.jpg",
    "Terraced Garden": "30.10.jpg"
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    "Diu Fort": "31.1.jpg",
    "Vanganga Lake Garden": "31.2.jpg",
    "Nagoa Beach": "31.3.jpg",
    "Gangeshwar Mahadev Temple": "31.4.jpg",
    "St. Paul's Church": "31.5.jpg",
    "Naida Caves": "31.6.jpg",
    "Devka Beach": "31.7.jpg",
    "Jampore Beach": "31.8.jpg",
    "Silvassa Vasona Lion Safari": "31.9.jpg",
    "Swaminarayan Temple": "31.10.jpg"
  },
  "Delhi": {
    "Red Fort": "32.1.avif",
    "Qutub Minar": "32.2.jpeg",
    "India Gate": "32.3.webp",
    "Humayun's Tomb": "32.4.webp",
    "Lotus Temple": "32.5.jpg",
    "Akshardham Temple": "32.6.jpg",
    "Jama Masjid": "32.7.jpg",
    "Jantar Mantar": "32.8.jpg",
    "Lodhi Garden": "32.9.webp",
    "Chandni Chowk": "32.10.jpg"
  },
  "Jammu and Kashmir": {
    "Dal Lake": "33.1.jpg",
    "Gulmarg Gondola": "33.2.jpeg",
    "Vaishno Devi Temple": "33.3.jpg",
    "Pahalgam": "33.4.avif",
    "Shankaracharya Temple": "33.5.jpg",
    "Sonamarg": "33.6.jpg",
    "Mughal Gardens": "33.7.webp",
    "Amarnath Cave": "33.8.jpg",
    "Betaab Valley": "33.9.jpg",
    "Apharwat Peak": "33.10.jpg"
  },
  "Ladakh": {
    "Pangong Tso": "34.1.jpeg",
    "Nubra Valley": "34.2.jpg",
    "Thiksey Monastery": "34.3.jpg",
    "Magnetic Hill": "34.4.jpg",
    "Shanti Stupa": "34.5.jpg",
    "Khardung La": "34.6.jpg",
    "Tso Moriri": "34.7.jpg",
    "Leh Palace": "34.8.jpg",
    "Hemis Monastery": "34.9.jpeg",
    "Diskit Monastery": "34.10.jpg"
  },
  "Lakshadweep": {
    "Agatti Island": "35.1.jpg",
    "Minicoy Island": "35.2.jpg",
    "Bangaram Atoll": "35.3.jpg",
    "Kavaratti Island Marine Aquarium": "35.4.jpg",
    "Kalpeni Island": "35.5.jpg",
    "Kadmat Island": "35.6.jpg",
    "Thinnakara Island": "35.7.jpg",
    "Pitti Bird Sanctuary": "35.8.webp",
    "Amini Beach": "35.9.jpg",
    "Andrott Island": "35.10.webp"
  },
  "Puducherry": {
    "Auroville": "36.1.jpg",
    "Promenade Beach": "36.2.jpg",
    "Sri Aurobindo Ashram": "36.3.jpg",
    "Paradise Beach": "36.4.webp",
    "Basilica of the Sacred Heart": "36.5.jpg",
    "Auroville Beach": "36.6.jpg",
    "Serenity Beach": "36.7.jpg",
    "Botanical Garden": "36.8.webp",
    "Ousteri Lake": "36.9.jpg",
    "French War Memorial": "36.10.jpg"
  }
};

const updatePlaceImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to DB');

    let totalUpdated = 0;

    for (const [regionName, placeMapping] of Object.entries(mappings)) {
      const region = await Region.findOne({ name: regionName });
      if (!region) {
        console.error(`${regionName} region not found`);
        continue;
      }

      console.log(`\nUpdating places for ${regionName}...`);
      let updatedCount = 0;
      for (const [placeName, fileName] of Object.entries(placeMapping)) {
        const imageUrl = `/images/${fileName}`;
        
        const result = await Place.updateOne(
          { regionId: region._id, name: placeName },
          { $set: { imageUrl: imageUrl } }
        );

        if (result.matchedCount > 0) {
          console.log(`Updated ${placeName} -> ${imageUrl}`);
          updatedCount++;
        } else {
          console.warn(`Place not found: ${placeName}`);
        }
      }
      console.log(`Successfully updated ${updatedCount} places in ${regionName}.`);
      totalUpdated += updatedCount;
    }

    console.log(`\nTotal updated records: ${totalUpdated}`);
  } catch (error) {
    console.error('Error updating place images:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

updatePlaceImages();
