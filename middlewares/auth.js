// middlewares/auth.js
import jwt from 'jsonwebtoken';

export const auth = (handler) => (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN
    jwt.verify(token, process.env.JWT_SECRET);
    return handler(req, res);
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' });
  }
};
