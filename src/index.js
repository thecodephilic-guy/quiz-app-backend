import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware/error.js";
// import authRoutes from "./routes/authRoutes.js";
// import quizRoutes from "./routes/quizRoutes.js";
// import submissionRoutes from "./routes/submissionRoutes.js";

dotenv.config({path: "./.env"});  // Load environment variables

const app = express();

//Middleware:
app.use(express.json());
app.use(errorHandler);


// Routes
app.get("/", (req, res) => {
  res.send("Server active and runnig")
}) //this is just to check if the server responds or not

// app.use("/api/auth", authRoutes);
// app.use("/api/quizzes", quizRoutes);
// app.use("/api/submissions", submissionRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
