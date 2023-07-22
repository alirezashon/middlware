// pages/api/findAgent.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Sample agents object containing agent names
const agentsObject = {
  agentName: ['YAX', 'Tirajeh', 'Pishgaman', 'ide','پیشگامان سخت افزار تیراژه','زاگرس'],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
     try {
    //   const { searchString } = req.body;
const  searchString   = 'خرم آباد توسعه ‍پرداز ی ماداکتو زاگرس 424413148-عامل فنی(90)23-03-1402'
      // Function to find the agent name that contains the text from the input string
      const findMatchingAgent = (str: string): string | null => {
        const agentName = agentsObject.agentName.find((agent) => str.includes(agent));
        return agentName || null;
      };

      // Process the input string and find the matching agent name
      const matchedAgent = findMatchingAgent(searchString);

      res.status(200).json({ agentName: matchedAgent });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error.' });
    }
}
