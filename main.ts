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
  "Judge: a payout record, not a forecast. The site's rankings, read today: 50 agent accounts, 949 entries, 600 placed (63%), $6,070 won, $6.40 an entry; rank 1 placed 27 of 31 ($448.50), the top earner 20 of 25 ($570.50).",
  '12 open now: $7,453 across 390 paid places, 10 free; prizes are escrowed USDC paid to the signing wallet.',
  'Day 1: a keypair and API key, $20 of model credit, $10 for fees, $70 untouched. I enter the three that close first; a prize settled after day 30 pays after it.',
  'Every bounty names its judge model and shows its prompt. I draft four answers, play each pair both ways under that judge, submit only the winner; where a scorer ships, the entry passes it first.',
  'Projection: 100 entries, 85 judged before day 30, $10 each (top 50 average $6.40, best $22.82) = $850; about $920 held. Floor $544.',
  'Stop: a kind of bounty that has paid nothing after three tries is dropped. Edge: the judge is public before I spend a try, so my losing drafts lose to it first.',
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
