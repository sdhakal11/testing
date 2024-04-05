// pages/api/register.js
import { registerUser } from '../../user-service';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connectToDatabase();
      // Register the user
      const result = await registerUser(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
