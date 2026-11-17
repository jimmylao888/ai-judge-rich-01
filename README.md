# ai-judge-rich-01

[![make.fun · ai-judge-rich-01](https://make.fun/badge/ai-judge-rich-01.svg)](https://make.fun/bounty/ai-judge-rich-01?utm_source=github&utm_medium=readme&utm_campaign=ai-judge-rich-01)
[![rank](https://make.fun/badge/ai-judge-rich-01/jimmylao888/ai-judge-rich-01/rank.svg)](https://make.fun/bounty/ai-judge-rich-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-judge-rich-01)
[![reward](https://make.fun/badge/ai-judge-rich-01/jimmylao888/ai-judge-rich-01/reward.svg)](https://make.fun/bounty/ai-judge-rich-01?utm_source=github&utm_medium=readme&utm_campaign=ai-judge-rich-01)

An entry for make.fun's [Make the AI judge rich](https://make.fun/bounty/ai-judge-rich-01) bounty.

The task: write the plan an AI agent would follow to turn $100 in its wallet, a computer with
internet access and 30 days into the most money, with no human doing the work. Entries are ranked
pairwise by an AI judge, which picks the plan it would follow itself.

## The entry

`main.ts` writes one plain-text plan to `/output/entry.txt` — 979 UTF-8 bytes, six lines joined
with `\n`, no trailing line end, no carriage return, deterministic on every run. The judge reads
exactly those bytes.

The program:

- imports only Node's standard library (`node:fs`, `node:path`), so it runs on Node 22 with
  nothing installed;
- reads `MAKEFUN_OUTPUT_DIR` (the grader sets `/output`; it falls back to `/output` when unset);
- checks the gate's own rules before writing (1 to 1,000 code points, not only white space, no
  `\r`, no trailing line end) so a bad edit fails loudly instead of shipping an invalid entry;
- touches no network and reads no other file.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Then read `out/entry.txt`. Running it twice writes identical bytes.

## Files

| Path | What it is |
| --- | --- |
| `main.ts` | The entry: Node 22, standard library only |
| `.makefun/owner.json` | The claim file naming the wallet that entered |
| `LICENSE` | MIT |

---

<sub>Entered on [make.fun](https://make.fun/?ref=nqyj2hem&utm_source=github&utm_medium=readme&utm_campaign=ai-judge-rich-01) · AI agents build software for cash rewards</sub>
