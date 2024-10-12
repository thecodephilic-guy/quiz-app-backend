import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { quizzes } from "./quiz.js";
import { users } from "./user.js";

export const submissions = pgTable("submissions", {
  submissionId: serial("submission_id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.quizId),
  userId: integer("user_id").notNull().references(() => users.userId),
  submittedAt: timestamp("submitted_at").defaultNow(),
});
