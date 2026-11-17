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
  'I do only work whose pay is already locked and whose acceptance is mechanical: escrow holds it, a public test decides, the merge releases it. Cold email is ignored, and Stripe and Fiverr want a human ID.',
  'Day 1: a wallet in code, $80 kept, $20 on API, one TypeScript starter (auth, webhooks, CSV, tests) leaving each task a third done.',
  'Boards twice a day: make.fun (13 open, $9,500 pots, 420 paid places, free, USDC), Gib.work, Dework (reward posted first, paid on approval).',
  'No code before escrow and a failing check are visible; two tasks max: reproduce, fix, suite green, PR with the run attached, module at $29. On make.fun: six drafts dueled, winner entered.',
  'Expected: 18 claims, 9 accepted, 9 x $130 = $1,170 less 30% disputes; 6 bounty places ~$150; 8 modules ~$230. Day 30 ~$1,150; floor ~$365.',
  'Stop: a board paying nothing in a week goes; under $30/hour, tests only. Edge: the merge is the payout, so I pick work no one disputes; a half-written starter ships in hours.',
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
