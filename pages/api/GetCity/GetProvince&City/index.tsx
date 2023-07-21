 
    import { NextApiRequest, NextApiResponse } from 'next';
    
    interface CitiesData {
        [key: string]: { [key: string]: string };
    }
    
    const cities: CitiesData = {
        Tehran: { 'Bomehen': 'بومهن', 'Tehran': 'تهران', /*...*/ },
        Markazi: { 'Arak': 'اراک', 'Faraan': 'فراهان', /*...*/ }
    };
    
    function comparePersianStrings(str1: string, str2: string): boolean {
        return str1.localeCompare(str2, 'fa', { sensitivity: 'base' }) === 0;
    }
    
    export default function handler(req: NextApiRequest, res: NextApiResponse) {
        // const { city, province } = req.query;
        const province = 'Markazi';
        const city = 'فراهان'

  if (!city || typeof city !== 'string' || !province || typeof province !== 'string') {
    return res.status(400).json({ error: 'City and Province parameters are missing or invalid.' });
  }

  // Find the city name based on province and city
  const cityObject = cities[province];
  if (!cityObject) {
    return res.status(404).json({ error: 'Province not found.' });
  }

  const cityName = Object.keys(cityObject).find((key) => comparePersianStrings(city, cityObject[key]));

  if (!cityName) {
    return res.status(404).json({ error: 'City not found.' });
  }

  return res.status(200).json({ city: cityName, province });
}