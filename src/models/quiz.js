import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.js";

export const quizzes = pgTable("quizzes", {
  quizId: serial("quiz_id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  userId: integer("user_id").notNull().references(() => users.userId),
  createdAt: timestamp("created_at").defaultNow(),
});
