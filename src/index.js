import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import express from "express";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

dotenv.config({path: "./.env"});  // Load environment variables

const connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);
console.log("Connected to the database!");

const app = express();

//Middleware:
app.use(express.json());
app.use(errorHandler);


// Routes
app.get("/", (req, res) => {
  res.send("Server active and runnig")
}) //this is just to check if the server responds or not

app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/submissions", submissionRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export { db };
