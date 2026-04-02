/**
 * Exponential-time Fibonacci (no memo). Real CPU cost — not a timer.
 * n≈41–42 is typically multi‑second in Node/V8.
 */
export function naiveFib(n: number): number {
  if (n <= 1) return n;
  return naiveFib(n - 1) + naiveFib(n - 2);
}
