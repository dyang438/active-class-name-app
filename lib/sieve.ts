/**
 * Sieve of Eratosthenes — O(n log log n) but enough work at large n to stress the main thread.
 */
export function countPrimesUpTo(limit: number): number {
  if (limit < 2) {
    return 0;
  }
  const composite = new Uint8Array(limit + 1);
  let count = 0;
  for (let p = 2; p <= limit; p++) {
    if (composite[p]) {
      continue;
    }
    count++;
    for (let m = p * p; m <= limit; m += p) {
      composite[m] = 1;
    }
  }
  return count;
}
