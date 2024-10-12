import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { quizzes } from "./quiz.js";

export const questions = pgTable("questions", {
  quesId: serial("ques_id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.quizId),
  quesText: text("ques_text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
