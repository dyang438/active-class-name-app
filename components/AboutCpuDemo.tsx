"use client";

import { useCallback, useState } from "react";
import { countPrimesUpTo } from "../lib/sieve";

/** Upper bound tuned for a noticeable pause on a typical laptop without freezing the tab for too long. */
const PRIME_LIMIT = 12_500_000;

export default function AboutCpuDemo() {
  const [ms, setMs] = useState<number | null>(null);
  const [primes, setPrimes] = useState<number | null>(null);

  const runSieve = useCallback(() => {
    const t0 = performance.now();
    const c = countPrimesUpTo(PRIME_LIMIT);
    setMs(Math.round(performance.now() - t0));
    setPrimes(c);
  }, []);

  return (
    <section aria-label="CPU demo">
      <h2>Prime sieve</h2>
      <p className="muted">
        Click runs a sieve of Eratosthenes up to {PRIME_LIMIT.toLocaleString()}{" "}
        (single-threaded, main thread).
      </p>
      <p>
        <button type="button" onClick={runSieve}>
          Run sieve
        </button>
        {ms != null && primes != null && (
          <span className="muted">
            {" "}
            Found {primes.toLocaleString()} primes in {ms}ms
          </span>
        )}
      </p>
    </section>
  );
}
