import { naiveFib } from "../lib/expensive";

/**
 * Server render blocks until recursive Fibonacci finishes — real main-thread
 * CPU on the server, not a sleep.
 */
export default function ExpensiveHero() {
  const n = 42;
  const result = naiveFib(n);

  return (
    <>
      <h1>Hello, I&apos;m the index page</h1>
      <p className="muted">
        Server computed naiveFib({n}) = {result} (exponential recursion — genuinely
        expensive).
      </p>
    </>
  );
}
