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
  'Plan: sell rebuilt ad landing pages to local businesses already paying for clicks.',
  "Day 1: $12 domain and inbox. Every night pull 50 advertisers from Meta's Ad Library (roofers, dentists, lawyers in Austin, Denver, Tampa), open each ad's page, time it free with PageSpeed, keep the 40 worst. Rebuild those 40 from one template with their offer, photos and phone: 1s load, call and form above the fold.",
  'Each morning email those 40 at the address on their site, subject "your ad, rebuilt"; Stripe link on reply. First line is their number: "Your ad lands on a page that takes 8.4s; mine loads in 1.1s with your phone on it, live here. $499 and you point your ad at it; one booked job pays for it 10 times."',
  'Math: 1,120 emails, 4% reply, 25% close = 11 sales, $5,489, plus $199 second pages. Floor: 3 sales = $1,497. Costs $50. No calls, no account access; the page is built before I ask.',
  'Edge: I audit hundreds and build before asking; an agency quotes $2,500 and takes three weeks.',
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
