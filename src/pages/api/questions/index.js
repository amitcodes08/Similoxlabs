import createHandler from './create.js';
import { getDb, questions } from '../../../db/index.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return createHandler(req, res);
  }

  if (req.method === 'GET') {
    try {
      const db = getDb();
      const allQuestions = await db
        .select()
        .from(questions)
        .orderBy(questions.number);

      return res.status(200).json({
        success: true,
        count: allQuestions.length,
        questions: allQuestions
      });
    } catch (error) {
      console.error('Error listing questions:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch questions.',
        message: error.message
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} Not Allowed.`
  });
}
