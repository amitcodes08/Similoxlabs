import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  real,
  boolean,
  timestamp,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['STUDENT', 'TEACHER', 'ADMIN']);

export const difficultyEnum = pgEnum('difficulty', ['EASY', 'MEDIUM', 'HARD']);

export const submissionStatusEnum = pgEnum('submission_status', [
  'PENDING',
  'ACCEPTED',
  'WRONG_ANSWER',
  'TIME_LIMIT_EXCEEDED',
  'MEMORY_LIMIT_EXCEEDED',
  'COMPILATION_ERROR',
  'RUNTIME_ERROR',
]);

// 1. Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  rollno: varchar('rollno', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash'),
  role: userRoleEnum('role').default('STUDENT').notNull(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  department: varchar('department', { length: 100 }),
  course: varchar('course', { length: 100 }),
  section: varchar('section', { length: 20 }),
  totalSolved: integer('total_solved').default(0).notNull(),
  totalAttempted: integer('total_attempted').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. Questions / Problems
export const questions = pgTable('questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  number: integer('number').unique(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  difficulty: difficultyEnum('difficulty').default('EASY').notNull(),
  category: varchar('category', { length: 100 }).default('Algorithms'),
  acceptance: varchar('acceptance', { length: 20 }),
  isExempted: boolean('is_exempted').default(false).notNull(),
  likes: integer('likes').default(0).notNull(),
  dislikes: integer('dislikes').default(0).notNull(),
  topics: jsonb('topics'),
  companies: jsonb('companies'),
  description: text('description').notNull(),
  inputFormat: text('input_format'),
  outputFormat: text('output_format'),
  examples: jsonb('examples'),
  constraints: jsonb('constraints'),
  hints: jsonb('hints'),
  starterCode: jsonb('starter_code'),
  editorial: jsonb('editorial'),
  timeLimit: integer('time_limit').default(1000).notNull(), // in ms
  memoryLimit: integer('memory_limit').default(256).notNull(), // in MB
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  isPublished: boolean('is_published').default(true).notNull(),
  tags: jsonb('tags'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 3. Test Cases for Questions
export const testCases = pgTable('test_cases', {
  id: uuid('id').defaultRandom().primaryKey(),
  questionId: uuid('question_id')
    .references(() => questions.id, { onDelete: 'cascade' })
    .notNull(),
  name: varchar('name', { length: 255 }),
  stdin: text('stdin'),
  expectedStdout: text('expected_stdout'),
  isHidden: boolean('is_hidden').default(false).notNull(),
  explanation: text('explanation'),
  orderIndex: integer('order_index').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Student Submissions
export const submissions = pgTable('submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  questionId: uuid('question_id')
    .references(() => questions.id, { onDelete: 'cascade' })
    .notNull(),
  studentId: uuid('student_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  code: text('code').notNull(),
  language: varchar('language', { length: 50 }).notNull(),
  status: submissionStatusEnum('status').default('PENDING').notNull(),
  runtimeMs: integer('runtime_ms'),
  memoryMb: real('memory_mb'),
  passedTests: integer('passed_tests').default(0),
  totalTests: integer('total_tests').default(0),
  errorMessage: text('error_message'),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

// 5. Test Case Execution Results per Submission
export const submissionTestResults = pgTable('submission_test_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  submissionId: uuid('submission_id')
    .references(() => submissions.id, { onDelete: 'cascade' })
    .notNull(),
  testCaseId: uuid('test_case_id')
    .references(() => testCases.id, { onDelete: 'cascade' }),
  caseNumber: integer('case_number'),
  status: varchar('status', { length: 50 }).notNull(),
  runtimeMs: integer('runtime_ms'),
  memoryMb: real('memory_mb'),
  stdin: text('stdin'),
  expectedStdout: text('expected_stdout'),
  actualStdout: text('actual_stdout'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export const usersRelations = relations(users, ({ many }) => ({
  createdQuestions: many(questions),
  submissions: many(submissions),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  author: one(users, {
    fields: [questions.authorId],
    references: [users.id],
  }),
  testCases: many(testCases),
  submissions: many(submissions),
}));

export const testCasesRelations = relations(testCases, ({ one, many }) => ({
  question: one(questions, {
    fields: [testCases.questionId],
    references: [questions.id],
  }),
  submissionResults: many(submissionTestResults),
}));

export const submissionsRelations = relations(submissions, ({ one, many }) => ({
  question: one(questions, {
    fields: [submissions.questionId],
    references: [questions.id],
  }),
  student: one(users, {
    fields: [submissions.studentId],
    references: [users.id],
  }),
  testResults: many(submissionTestResults),
}));

export const submissionTestResultsRelations = relations(submissionTestResults, ({ one }) => ({
  submission: one(submissions, {
    fields: [submissionTestResults.submissionId],
    references: [submissions.id],
  }),
  testCase: one(testCases, {
    fields: [submissionTestResults.testCaseId],
    references: [testCases.id],
  }),
}));