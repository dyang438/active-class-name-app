/**
 * GET /api/health — minimal JSON for CI timing (compare-action).
 */
export function GET() {
  return Response.json({ ok: true });
}
