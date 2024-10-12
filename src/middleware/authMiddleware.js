import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config({path: "../../.env"})
console.log(process.env.JWT_SECRET);

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next();
};
