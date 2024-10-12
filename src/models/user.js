import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  username: varchar("username", {length: 100}).notNull(),
  email: text("email").notNull(),
  password: varchar("password", {length: 100}).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
