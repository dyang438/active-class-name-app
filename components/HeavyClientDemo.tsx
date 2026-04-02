"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Real cost: huge fetch + JSON.parse, and a large in-memory sort on click.
 */
export default function HeavyClientDemo() {
  const [fetchState, setFetchState] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [bytesLabel, setBytesLabel] = useState<string | null>(null);
  const [sortMs, setSortMs] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setFetchState("loading");
    fetch("/api/heavy-data")
      .then(async (r) => {
        const text = await r.text();
        if (cancelled) return;
        JSON.parse(text);
        setBytesLabel(`${(text.length / 1024).toFixed(0)} KB received & parsed`);
        setFetchState("done");
      })
      .catch(() => {
        if (!cancelled) setFetchState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const runHeavySort = useCallback(() => {
    const n = 4_000_000;
    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) a[i] = Math.random();
    const t0 = performance.now();
    a.sort();
    setSortMs(Math.round(performance.now() - t0));
  }, []);

  return (
    <section className="heavy-demo" aria-label="Heavy client work demo">
      <h2>Heavy client work</h2>
      <p className="muted">
        No artificial delays—large payload and big numeric sort are real work.
      </p>
      <ul>
        <li>
          <strong>Large JSON:</strong>{" "}
          {fetchState === "loading" && "Downloading /api/heavy-data…"}
          {fetchState === "done" && bytesLabel}
          {fetchState === "error" && "Request failed"}
        </li>
        <li>
          <strong>Sort 4M floats:</strong>{" "}
          <button type="button" onClick={runHeavySort}>
            Run sort
          </button>
          {sortMs != null && (
            <span className="muted"> Took {sortMs}ms (main thread)</span>
          )}
        </li>
      </ul>
    </section>
  );
}
