import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { submissions } from "./submission.js";
import { questions } from "./question.js";
import { options } from "./option.js";

export const answers = pgTable("answers", {
  ansId: serial("ans_id").primaryKey(),
  submissionId: integer("submission_id").notNull().references(() => submissions.submissionId),
  questionId: integer("question_id").notNull().references(() => questions.quesId),
  selectedOptionId: integer("selected_option_id").notNull().references(() => options.optionId),
  createdAt: timestamp("created_at").defaultNow(),
});
