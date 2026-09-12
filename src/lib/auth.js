import { getDb, users } from '../db/index.js';
import { eq } from 'drizzle-orm';

/**
 * Validates whether the incoming Next.js API request is from a TEACHER or ADMIN.
 * Checks (in order):
 * 1. x-user-role header (e.g. 'TEACHER', 'ADMIN')
 * 2. x-user-id header (looks up user in DB)
 * 3. Body/query role fallback (e.g. req.body.role, req.query.role)
 *
 * @param {import('next').NextApiRequest} req
 * @returns {Promise<{ isAuthorized: boolean, role: string|null, userId: string|null, error?: string }>}
 */
export async function authorizeTeacherOrAdmin(req) {
  let role = null;
  let userId = req.headers['x-user-id'] || req.body?.userId || null;

  // 1. Check direct role header
  const headerRole = req.headers['x-user-role'] || req.headers['role'];
  if (typeof headerRole === 'string' && headerRole.trim()) {
    role = headerRole.trim().toUpperCase();
  }

  // 2. If userId provided, verify/fetch from database
  if (userId) {
    try {
      const db = getDb();
      const userList = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (userList && userList.length > 0) {
        role = userList[0].role?.toUpperCase();
      }
    } catch (err) {
      console.warn('Could not query user for authorization:', err.message);
    }
  }

  // 3. Check fallback in body or query if not in headers
  if (!role) {
    const bodyOrQueryRole = req.body?.role || req.body?.userRole || req.query?.role;
    if (typeof bodyOrQueryRole === 'string' && bodyOrQueryRole.trim()) {
      role = bodyOrQueryRole.trim().toUpperCase();
    }
  }

  // Check if role is TEACHER or ADMIN
  const allowedRoles = ['TEACHER', 'ADMIN'];
  if (role && allowedRoles.includes(role)) {
    return {
      isAuthorized: true,
      role,
      userId
    };
  }

  return {
    isAuthorized: false,
    role: role || 'UNKNOWN',
    userId,
    error: role === 'STUDENT'
      ? 'Forbidden: Access restricted to TEACHER and ADMIN only. Students cannot create or edit questions.'
      : 'Unauthorized: Missing or invalid credentials. Role must be TEACHER or ADMIN.'
  };
}
