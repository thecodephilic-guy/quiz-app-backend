import dotenv from "dotenv";
import { submissions } from "../models/submission.js";
import { answers } from "../models/answer.js";
import { options } from "../models/option.js";
import { db } from "../index.js";
import { eq,and } from "drizzle-orm";

dotenv.config({ path: "../../.env" });

export const submitQuizAnswers = async (req, res) => {
  const { userId } = req.user; // User submitting the quiz
  const { quizId } = req.params;
  const { answersData } = req.body; // answersData is an array of { questionId, selectedOptionId }

  try {
    const newSubmission = await db
      .insert(submissions)
      .values({
        quizId,
        userId,
      })
      .returning();

    let score = 0;

    for (const ans of answersData) {
      // Insert answers
      await db.insert(answers).values({
        submissionId: newSubmission[0].submissionId,
        questionId: ans.questionId,
        selectedOptionId: ans.selectedOptionId,
      });

      const correctOption = await db
        .select()
        .from(options)
        .where(
          and(eq(options.quesId, ans.questionId), eq(options.isCorrect, true))
        )
        .limit(1);

      // Calculate score
      if (
        correctOption[0] &&
        correctOption[0].optionId === ans.selectedOptionId
      ) {
        score++;
      }
    }

    res.json({ score: score, message: "Quiz submitted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: error.code });
  }
};
