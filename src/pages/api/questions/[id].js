import { getDb, questions, testCases } from '../../../db/index.js';
import { authorizeTeacherOrAdmin } from '../../../lib/auth.js';
import { eq, or, sql } from 'drizzle-orm';

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeDifficulty(diff) {
  if (!diff) return undefined;
  const upper = String(diff).toUpperCase();
  if (upper === 'MEDIUM') return 'MEDIUM';
  if (upper === 'HARD') return 'HARD';
  return 'EASY';
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Handler for /api/questions/[id]
 * - PUT / PATCH: Edit Question (Restricted to TEACHER and ADMIN only)
 * - GET: Fetch Question details
 */
export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Question identifier (id, number, or slug) is required.'
    });
  }

  const db = getDb();

  // Helper to locate question by UUID, number, or slug
  async function findQuestion() {
    const isUuid = UUID_REGEX.test(id);
    const isNumber = !isNaN(Number(id));

    if (isUuid) {
      const rows = await db.select().from(questions).where(eq(questions.id, id)).limit(1);
      if (rows.length > 0) return rows[0];
    }

    if (isNumber) {
      const rows = await db.select().from(questions).where(eq(questions.number, Number(id))).limit(1);
      if (rows.length > 0) return rows[0];
    }

    // Lookup by slug as fallback
    const rows = await db.select().from(questions).where(eq(questions.slug, id)).limit(1);
    return rows[0] || null;
  }

  // --- GET: Fetch Question details ---
  if (req.method === 'GET') {
    try {
      const question = await findQuestion();
      if (!question) {
        return res.status(404).json({
          success: false,
          error: `Question with identifier "${id}" not found.`
        });
      }

      const qTestCases = await db
        .select()
        .from(testCases)
        .where(eq(testCases.questionId, question.id))
        .orderBy(testCases.orderIndex);

      return res.status(200).json({
        success: true,
        question,
        testCases: qTestCases
      });
    } catch (error) {
      console.error('Error fetching question:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error while fetching question.',
        message: error.message
      });
    }
  }

  // --- PUT / PATCH: Edit Question (Teacher / Admin Only) ---
  if (req.method === 'PUT' || req.method === 'PATCH') {
    // 1. Role Authorization Guard (TEACHER / ADMIN only)
    const auth = await authorizeTeacherOrAdmin(req);
    if (!auth.isAuthorized) {
      return res.status(403).json({
        success: false,
        error: auth.error || 'Forbidden: Access restricted to TEACHER and ADMIN only.',
        role: auth.role
      });
    }

    try {
      const existingQuestion = await findQuestion();
      if (!existingQuestion) {
        return res.status(404).json({
          success: false,
          error: `Question with identifier "${id}" not found.`
        });
      }

      const updateData = req.body || {};
      const fieldsToUpdate = {};

      if (updateData.title !== undefined) {
        if (typeof updateData.title !== 'string' || !updateData.title.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Title must be a non-empty string.'
          });
        }
        fieldsToUpdate.title = updateData.title.trim();
      }

      if (updateData.description !== undefined) {
        if (typeof updateData.description !== 'string' || !updateData.description.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Description must be a non-empty string.'
          });
        }
        fieldsToUpdate.description = updateData.description.trim();
      }

      if (updateData.slug !== undefined) {
        const candidateSlug = generateSlug(updateData.slug);
        if (candidateSlug !== existingQuestion.slug) {
          const conflicting = await db
            .select({ id: questions.id })
            .from(questions)
            .where(eq(questions.slug, candidateSlug))
            .limit(1);

          if (conflicting.length > 0 && conflicting[0].id !== existingQuestion.id) {
            return res.status(409).json({
              success: false,
              error: `Slug "${candidateSlug}" is already in use by another question.`
            });
          }
          fieldsToUpdate.slug = candidateSlug;
        }
      }

      if (updateData.difficulty !== undefined) {
        fieldsToUpdate.difficulty = normalizeDifficulty(updateData.difficulty);
      }

      if (updateData.category !== undefined) {
        fieldsToUpdate.category = updateData.category?.trim() || 'Algorithms';
      }

      if (updateData.acceptance !== undefined) {
        fieldsToUpdate.acceptance = updateData.acceptance;
      }

      if (updateData.isExempted !== undefined) {
        fieldsToUpdate.isExempted = Boolean(updateData.isExempted);
      }

      if (updateData.topics !== undefined) {
        fieldsToUpdate.topics = Array.isArray(updateData.topics) ? updateData.topics : [];
      }

      if (updateData.companies !== undefined) {
        fieldsToUpdate.companies = Array.isArray(updateData.companies) ? updateData.companies : [];
      }

      if (updateData.inputFormat !== undefined) {
        fieldsToUpdate.inputFormat = updateData.inputFormat?.trim() || null;
      }

      if (updateData.outputFormat !== undefined) {
        fieldsToUpdate.outputFormat = updateData.outputFormat?.trim() || null;
      }

      if (updateData.examples !== undefined) {
        fieldsToUpdate.examples = Array.isArray(updateData.examples) ? updateData.examples : [];
      }

      if (updateData.constraints !== undefined) {
        fieldsToUpdate.constraints = Array.isArray(updateData.constraints) ? updateData.constraints : [];
      }

      if (updateData.hints !== undefined) {
        fieldsToUpdate.hints = Array.isArray(updateData.hints) ? updateData.hints : [];
      }

      if (updateData.starterCode !== undefined) {
        fieldsToUpdate.starterCode = updateData.starterCode && typeof updateData.starterCode === 'object'
          ? updateData.starterCode
          : {};
      }

      if (updateData.testcases !== undefined) {
        fieldsToUpdate.testcases = Array.isArray(updateData.testcases) ? updateData.testcases : [];
      }

      if (updateData.editorial !== undefined) {
        fieldsToUpdate.editorial = updateData.editorial && typeof updateData.editorial === 'object'
          ? updateData.editorial
          : null;
      }

      if (updateData.timeLimit !== undefined) {
        fieldsToUpdate.timeLimit = typeof updateData.timeLimit === 'number' ? updateData.timeLimit : 1000;
      }

      if (updateData.memoryLimit !== undefined) {
        fieldsToUpdate.memoryLimit = typeof updateData.memoryLimit === 'number' ? updateData.memoryLimit : 256;
      }

      if (updateData.isPublished !== undefined) {
        fieldsToUpdate.isPublished = Boolean(updateData.isPublished);
      }

      if (updateData.tags !== undefined) {
        fieldsToUpdate.tags = Array.isArray(updateData.tags) ? updateData.tags : [];
      }

      fieldsToUpdate.updatedAt = new Date();

      // 2. Perform Question Update
      const [updatedQuestion] = await db
        .update(questions)
        .set(fieldsToUpdate)
        .where(eq(questions.id, existingQuestion.id))
        .returning();

      // 3. If new testcases array is passed, synchronize test_cases table
      let syncedTestCases = [];
      if (Array.isArray(updateData.testcases)) {
        // Delete previous test cases for clean synchronization
        await db
          .delete(testCases)
          .where(eq(testCases.questionId, existingQuestion.id));

        if (updateData.testcases.length > 0) {
          const tcValues = updateData.testcases.map((tc, idx) => ({
            questionId: existingQuestion.id,
            name: tc.name || `Case ${idx + 1}`,
            stdin: tc.stdin || tc.input || '',
            expectedStdout: tc.expectedStdout || tc.expectedOutput || tc.output || '',
            isHidden: Boolean(tc.isHidden),
            explanation: tc.explanation || null,
            orderIndex: idx
          }));

          syncedTestCases = await db
            .insert(testCases)
            .values(tcValues)
            .returning();
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Question updated successfully',
        question: updatedQuestion,
        testCases: syncedTestCases
      });
    } catch (error) {
      console.error('Error updating question:', error);

      if (error.code === '23505') {
        return res.status(409).json({
          success: false,
          error: 'Conflict: Unique constraint violation on updated question fields.',
          details: error.detail || error.message
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Failed to update question due to a server error.',
        message: error.message
      });
    }
  }

  // Any other HTTP method
  res.setHeader('Allow', ['GET', 'PUT', 'PATCH']);
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} Not Allowed. Use PUT or PATCH to edit question.`
  });
}
