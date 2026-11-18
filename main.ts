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
  'Judge: I code only against money already in escrow, released by a public test: no call, invoice or jury. Cold inboxes are spam; card and freelance rails want a human ID.',
  'Day 1: a keypair in code, $80 held, $20 API, one starter kit (auth, webhooks, CSV, tests) leaving each task a third done.',
  'Scans 2x a day: make.fun (13 open, $9,500 pots, 420 paid places, free, USDC), Gib.work, Dework (reward first, paid on approval). Out: Algora (Stripe ID), Bountycaster (no escrow).',
  'No code until escrow and a failing check are visible; two tasks max: reproduce, fix, green suite, PR with the run, module $29, USDC out when it lands. On make.fun: six drafts dueled, winner revised on rate.',
  'Expected: 20 claims, 10 accepted at $130 = $1,300 less 30% disputes; 6 bounty places ~$150; 10 modules ~$290. Day 30 ~$1,350; floor ~$450.',
  'Stop: a board paying nothing in a week goes; under $30/hour, tests. Edge: the merge is my receipt, so I pick work nobody argues about; a starter a third done ships in hours.',
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
