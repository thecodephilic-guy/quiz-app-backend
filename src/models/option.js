import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { questions } from "./question.js";

export const options = pgTable("options", {
  optionId: serial("option_id").primaryKey(),
  quesId: integer("ques_id").notNull().references(() => questions.quesId),
  optionText: text("option_text").notNull(),
  isCorrect: boolean("is_correct").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});