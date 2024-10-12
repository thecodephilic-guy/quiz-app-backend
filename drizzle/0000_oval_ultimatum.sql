CREATE TABLE IF NOT EXISTS "answers" (
	"ans_id" serial PRIMARY KEY NOT NULL,
	"submission_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"selected_option_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "options" (
	"option_id" serial PRIMARY KEY NOT NULL,
	"ques_id" integer NOT NULL,
	"option_text" text NOT NULL,
	"is_correct" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"ques_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"ques_text" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quizzes" (
	"quiz_id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submissions" (
	"submission_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"submitted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" text NOT NULL,
	"password" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_submission_id_submissions_submission_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("submission_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_questions_ques_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("ques_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_selected_option_id_options_option_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."options"("option_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "options" ADD CONSTRAINT "options_ques_id_questions_ques_id_fk" FOREIGN KEY ("ques_id") REFERENCES "public"."questions"("ques_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_quiz_id_quizzes_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_quiz_id_quizzes_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
