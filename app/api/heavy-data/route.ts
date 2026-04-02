/**
 * GET /api/heavy-data — large JSON body: real stringify + transfer + client parse cost.
 */
export function GET() {
  const len = 100_000;
  const items: number[] = new Array(len);
  let checksum = 0;
  for (let i = 0; i < len; i++) {
    const v = Math.sin(i) * i;
    items[i] = v;
    checksum += v;
  }
  return Response.json({ len, checksum, items });
}
