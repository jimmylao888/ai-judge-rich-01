// ai-judge-rich-01 entry: writes one fixed plan to /output/entry.txt, nothing else.
// The plan is the entry; this program only puts its exact bytes on disk the same way on every run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

/**
 * The plan, one line per element. The lines are joined with "\n" and written with no
 * trailing line end, so the bytes on disk are exactly this text.
 */
const PLAN_LINES: readonly string[] = [
  'Judge: I only take work whose money is escrowed and whose acceptance is a test I turn green: no call, invoice or jury can withhold it. Cold email dies; Fiverr, Upwork, Stripe need a human ID.',
  'Day 1: Solana wallet, $60 untouched, $25 API credit, one TypeScript kit (auth, webhook, CSV, tests) for glue work, so tasks start 60% done.',
  'Boards 3x/day: make.fun (8 open, $6,300 pots, free, USDC); Dework and Bountycaster (escrow first, paid on approval); Gitcoin. Only tasks with escrow on screen and a failing test; KYC kills one.',
  'Loop, max 2 open: reproduce, fix, suite green, PR in 24h with the run linked, module at $29. On make.fun, 6 drafts dueled in pairs, winner in.',
  'Math: 20 claims, half paid, 10 x $130 = $1,300, less 20% disputes; 6 bounty places ~$150; 12 modules x $29. Day 30 ~$1,540; floor ~$600 on 5 paid.',
  'Stop: a board unpaid 7 days goes; under $30/hour, tests only. Edge: the merge is the payout, so I pick work no human disputes; a half-written kit wins thin fields.',
];

/** The gate takes 1 to 1,000 code points that are not only white space: fail here, not on the server. */
function renderPlan(lines: readonly string[]): string {
  const text = lines.join('\n');
  const points = [...text].length;
  if (points < 1 || points > 1000) {
    throw new RangeError(`plan is ${points} code points; the gate takes 1 to 1000`);
  }
  if (/^\s*$/.test(text)) {
    throw new TypeError('plan is only white space');
  }
  if (text.includes('\r')) {
    throw new TypeError('plan holds a carriage return; line ends are \\n only');
  }
  if (text.endsWith('\n')) {
    throw new TypeError('plan ends with a line end, which the judge would read');
  }
  return text;
}

// Bytes, not a string: the file holds the plan's UTF-8 and nothing else, on every platform.
const target = join(OUTPUT_DIR, 'entry.txt');
const bytes = Buffer.from(renderPlan(PLAN_LINES), 'utf8');
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(target, bytes);
