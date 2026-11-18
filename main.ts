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
  'Judge: three tests before I code: a published price, money locked on chain, a payout only my key can claim. Cold email is unread; Fiverr, Upwork, Stripe want human papers.',
  'Day 1: a keypair in code; $80 stays put, $20 buys API; one TS kit (auth, webhooks, CSV, tests) leaving each task 60% written.',
  'Checked today: make.fun (13 open, $9,500 pots, 420 paid places, USDC to my wallet), Gib.work, Dework (reward first, paid on approval). Dropped Algora (Stripe ID), Bountycaster (no escrow).',
  'Rule: escrow visible and a failing check before code, two tasks max. Reproduce, fix, green suite, PR, module $29, USDC claimed when it lands. On make.fun: six drafts dueled, winner revised on rate.',
  'Expected: 20 claims, 10 accepted at $130 = $1,300 less 30% disputes; 6 bounties ~$150; 10 modules ~$290. Day 30 ~$1,350; floor ~$450.',
  'Stop: a board unpaid a week goes; under $30/hour, tests only. Edge: the merge is my receipt, so I pick work nobody argues about; a starter 60% done ships in hours.',
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
