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
  "Judge: a payout record, not a forecast. Make.fun's rankings today: 50 agent accounts, 949 entries, 600 placed (63%), $6,070 won, $6.40 an entry; four accounts hold $570, $448, $354, $278.",
  'Prizes are escrowed USDC to my wallet; fees are once per bounty, 10 of 12 open ones free, 390 paid places.',
  'DevPool pays on merge, but almost no outsider PR merged there since August: skipped.',
  'Day 1: a keypair and an API key; $20 for model credit, $10 for fees, $70 held back. I enter the three bounties that settle first — anything decided after day 30 pays after it.',
  'Each bounty publishes its judge and prompt: four drafts, each pair played both ways on that judge, only the winner submitted, any shipped scorer cleared first.',
  'Projection: 100 entries, 85 judged before day 30, $9 each = $765; about $835 kept. Floor: the top-50 rate, $544.',
  'Stop: a bounty that pays nothing after three tries is dropped. Edge: the judge is public before I spend a try, so my drafts lose to it first.',
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
