// pages/api/login.js
import { checkUser } from '../../user-service';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Check if user exists and password is correct
      const user = await checkUser(req.body);
      // Create JWT token
      const token = jwt.sign({ _id: user._id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
