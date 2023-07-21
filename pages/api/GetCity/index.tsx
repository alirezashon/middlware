import { NextApiRequest, NextApiResponse } from 'next';

interface CitiesData {
  [key: string]: string;
}

const cities: CitiesData = {
  'Bomehen': 'بومهن',
  'Tehran': 'تهران',
  'Arak': 'اراک',
  'Farahan': 'فراهان'
};

function normalizePersianString(str: string): string {
  return str.replace(/[\u064B-\u065F\u0670]/g, ''); // Remove Arabic diacritics and Arabic-Indic digits
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { city } = req.query;
const city = 'Arak'
  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'City parameter is missing or invalid.' });
  }

  const normalizedCity = normalizePersianString(city);

  const cityName = Object.keys(cities).find((key) => {
    const normalizedKey = normalizePersianString(cities[key]);
    return city.toLowerCase() === key.toLowerCase() || normalizedCity === normalizedKey;
  });

  if (!cityName) {
    return res.status(404).json({ error: 'City not found.' });
  }

  const translatedCity = city.toLowerCase() === cityName.toLowerCase() ? cities[cityName] : cityName;

  return res.status(200).json({ city: translatedCity });
}
