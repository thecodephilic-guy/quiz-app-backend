import dotenv from "dotenv";
import { quizzes } from "../models/quiz.js";
import { db } from "../index.js";
import { eq } from "drizzle-orm";

dotenv.config({ path: "../../.env" });

export const createQuiz = async (req, res) => {
  const inputData = req.body;

  //I am skipping the checks on the user data if they need to be done then can be performed here only

  //flow:
  //1. insert the data into the table
  //2. return success message with data to let client use is if they need to

  try {
    const newQuiz = await db.insert(quizzes).values(inputData).returning();
    if (newQuiz.length === 0) {
      throw new Error("Failed to create the quiz");
    }

    return res.status(201).json(newQuiz[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: error.code });
  }
};

export const getAllQuizzes = async (req, res) => {
    try{
        const allQuizzes = await db.select().from(quizzes);
        if(allQuizzes.length === 0){
            throw new Error("Can't fetch quizzes!");
        }
        
        return res.status(200).json(allQuizzes)
    }catch(error){
        return res.status(500).json({message: error.message, code: error.code});
    }
};

export const getQuizById = async (req, res) => {
    const quizId = req.params.quizId;

    //within this function only I need to call other controllers like fetch all questions of quiz and return them from this controller.

    try{
        const quiz = await db.select().from(quizzes).where(eq(quizzes.quizId, quizId));
        if(quiz.length === 0){
            throw new Error("Quiz not found!");
        }

        return res.status(200).json(quiz[0]);
    }catch(error){
        return res.status(500).json({message: error.message, code: error.code});
    }
} 

