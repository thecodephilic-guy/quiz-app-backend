import dotenv from "dotenv";
import { quizzes } from "../models/quiz.js";
import { db } from "../index.js";
import { eq } from "drizzle-orm";
import { questions } from "../models/question.js";
import { options } from "../models/option.js";

dotenv.config({ path: "../../.env" });

export const createQuiz = async (req, res) => {
  const { title, description, questionsData } = req.body;
  const { userId } = req.user; //id of the user creating the quiz

  //I am skipping the checks on the user data if they need to be done then can be performed here only

  //flow:
  //1. insert the data into the tables
  //2. return success message with data to let client use is if they need to

  try {
    const newQuiz = await db
      .insert(quizzes)
      .values({
        title,
        description,
        userId,
      })
      .returning();

    if (newQuiz.length === 0) {
      throw new Error("Failed to create the quiz");
    }

    for (const ques of questionsData) {
      const newQuestion = await db
        .insert(questions)
        .values({
          quizId: newQuiz[0].quizId,
          quesText: ques.quesText,
        })
        .returning();

      for (const option of ques.options) {
        await db.insert(options).values({
          quesId: newQuestion[0].quesId,
          optionText: option.optionText,
          isCorrect: option.isCorrect,
        });
      }
    }

    return res
      .status(201)
      .json({
        message: "Quiz created Successfully",
        title: newQuiz[0].title,
        quizId: newQuiz[0].quizId,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: error.code });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const allQuizzes = await db.select().from(quizzes);
    if (allQuizzes.length === 0) {
      throw new Error("Can't fetch quizzes!");
    }

    return res.status(200).json(allQuizzes);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: error.code });
  }
};

export const getQuizById = async (req, res) => {
  const quizId = req.params.quizId;

  //within this function only I need to call other controllers like fetch all questions of quiz and return them from this controller.

  try {
    const quiz = await db
      .select()
      .from(quizzes)
      .where(eq(quizzes.quizId, quizId))
      .limit(1);
    if (quiz.length === 0) {
      throw new Error("Quiz not found!");
    }

    const quizQuestions = await db
      .select()
      .from(questions)
      .where(eq(questions.quizId, quizId));

    const quizWithQuestions = {
      ...quiz[0],
      questions: quizQuestions,
    };

    return res.status(200).json(quizWithQuestions);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: error.code });
  }
};
