import { getDb, questions, testCases } from '../../../db/index.js';
import { authorizeTeacherOrAdmin } from '../../../lib/auth.js';
import { eq, sql } from 'drizzle-orm';

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeDifficulty(diff) {
  if (!diff) return 'EASY';
  const upper = String(diff).toUpperCase();
  if (upper === 'MEDIUM') return 'MEDIUM';
  if (upper === 'HARD') return 'HARD';
  return 'EASY';
}

/**
 * Handler for POST /api/questions/create
 * Restricted to TEACHER and ADMIN roles only.
 */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed. Use POST to create questions.`
    });
  }

  // 1. Role Authorization Guard (TEACHER / ADMIN only)
  const auth = await authorizeTeacherOrAdmin(req);
  if (!auth.isAuthorized) {
    return res.status(403).json({
      success: false,
      error: auth.error || 'Forbidden: Access restricted to TEACHER and ADMIN only.',
      role: auth.role
    });
  }

  const {
    title,
    description,
    difficulty,
    category,
    acceptance,
    isExempted,
    topics,
    companies,
    inputFormat,
    outputFormat,
    examples,
    constraints,
    hints,
    starterCode,
    testcases,
    editorial,
    timeLimit,
    memoryLimit,
    authorId,
    isPublished,
    tags,
    number,
    slug: providedSlug
  } = req.body || {};

  // 2. Validate required inputs
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: Title is required and must be a non-empty string.'
    });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: Description is required and must be a non-empty string.'
    });
  }

  try {
    const db = getDb();

    // 3. Resolve Slug
    let baseSlug = (providedSlug && typeof providedSlug === 'string' && providedSlug.trim())
      ? generateSlug(providedSlug)
      : generateSlug(title);

    let finalSlug = baseSlug;
    let existingSlug = await db
      .select({ id: questions.id })
      .from(questions)
      .where(eq(questions.slug, finalSlug))
      .limit(1);

    if (existingSlug.length > 0) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    // 4. Resolve Problem Number (auto-increment next number if not provided)
    let finalNumber = null;
    if (number !== undefined && number !== null && !isNaN(Number(number))) {
      finalNumber = Number(number);
    } else {
      const maxRes = await db
        .select({ maxNumber: sql`COALESCE(MAX(${questions.number}), 0)` })
        .from(questions);
      finalNumber = Number(maxRes[0]?.maxNumber || 0) + 1;
    }

    // 5. Construct question insert payload
    const newQuestionPayload = {
      number: finalNumber,
      title: title.trim(),
      slug: finalSlug,
      difficulty: normalizeDifficulty(difficulty),
      category: category?.trim() || 'Algorithms',
      acceptance: acceptance || '0.0%',
      isExempted: Boolean(isExempted),
      likes: 0,
      dislikes: 0,
      topics: Array.isArray(topics) ? topics : [],
      companies: Array.isArray(companies) ? companies : [],
      description: description.trim(),
      inputFormat: inputFormat?.trim() || null,
      outputFormat: outputFormat?.trim() || null,
      examples: Array.isArray(examples) ? examples : [],
      constraints: Array.isArray(constraints) ? constraints : [],
      hints: Array.isArray(hints) ? hints : [],
      starterCode: starterCode && typeof starterCode === 'object' ? starterCode : {},
      testcases: Array.isArray(testcases) ? testcases : [],
      editorial: editorial && typeof editorial === 'object' ? editorial : null,
      timeLimit: typeof timeLimit === 'number' ? timeLimit : 1000,
      memoryLimit: typeof memoryLimit === 'number' ? memoryLimit : 256,
      authorId: authorId || auth.userId || null,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      tags: Array.isArray(tags) ? tags : []
    };

    // 6. Insert Question
    const [createdQuestion] = await db
      .insert(questions)
      .values(newQuestionPayload)
      .returning();

    // 7. Insert test cases into test_cases table if provided
    let insertedTestCases = [];
    if (Array.isArray(testcases) && testcases.length > 0 && createdQuestion?.id) {
      const testCasesValues = testcases.map((tc, idx) => ({
        questionId: createdQuestion.id,
        name: tc.name || `Case ${idx + 1}`,
        stdin: tc.stdin || tc.input || '',
        expectedStdout: tc.expectedStdout || tc.expectedOutput || tc.output || '',
        isHidden: Boolean(tc.isHidden),
        explanation: tc.explanation || null,
        orderIndex: idx
      }));

      insertedTestCases = await db
        .insert(testCases)
        .values(testCasesValues)
        .returning();
    }

    return res.status(201).json({
      success: true,
      message: 'Question created successfully',
      question: createdQuestion,
      testCases: insertedTestCases
    });
  } catch (error) {
    console.error('Error creating question:', error);

    // Handle unique constraint violations
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        error: 'Conflict: A question with this slug or number already exists.',
        details: error.detail || error.message
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to create question due to a server error.',
      message: error.message
    });
  }
}
