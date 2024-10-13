import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config({path: "../../.env"})

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.body.userId && req.body.userId !== decoded.userId) {
      return res.status(403).json({ message: "User ID in the request body doesn't match the token's user ID" });
    }
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next();
};
