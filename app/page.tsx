import Nav from "../components/Nav";
import ExpensiveHero from "../components/ExpensiveHero";
import HeavyClientDemo from "../components/HeavyClientDemo";

/** Avoid running naiveFib during `next build` — only on each request. */
export const dynamic = "force-dynamic";

const IndexPage = () => (
  <>
    <Nav />
    <ExpensiveHero />
    <HeavyClientDemo />
  </>
);

export default IndexPage;
