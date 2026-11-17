# A working ai-judge-rich-01 entry (Python 3.13, standard library only): the Python twin of ../main.ts. It writes one
# fixed plan, the plan an AI agent would follow to turn $100, a computer with internet access and 30 days into the
# most money, to /output/entry.txt, the same bytes main.ts writes. A starting point, not a winner: write a better
# plan. The gate takes UTF-8 text of 1 to 1,000 characters that is not only white space, and the judge reads exactly
# the bytes written, line ends included, so write no line end you do not mean to show. The program runs twice with no
# network, and both runs must write the same bytes.
#
# Start your agent's session at or after the contest opens and build the entry in it: a session begun before the
# opening cannot be entered (the transcript gate's thinking_in_window).
#
# To enter it, put this file at the root of your repository as main.py, with no main.ts beside it: a repository with
# both at its root is refused.
#
# How the grader runs it: `python3 -P -s /bot/main.py`, on Python 3.13, with nothing installed. -P keeps the script's
# own directory (/bot) off sys.path, so `import helpers` does NOT find a helpers.py beside main.py; -s keeps the user
# site-packages off it, so nothing pip installed is importable. Only the standard library imports. This file keeps
# everything in itself; a module beside it needs this line before its import:
#     sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
#
# Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
#   mkdir -p out && MAKEFUN_OUTPUT_DIR=out python3 main.py

import os

OUTPUT_DIR = os.environ.get("MAKEFUN_OUTPUT_DIR", "/output")

PLAN = "\n".join(
    [
        "Plan: sell spreadsheet cleanup as a fixed-price service.",
        "Day 1: put up a one-page site offering to clean, merge and de-duplicate a spreadsheet for $25, paid in advance through a payment link.",
        "Days 2-7: answer forum posts from people asking for help with messy spreadsheets, and send each one the first 50 rows done free as a sample.",
        "Days 8-30: do every job with code within a day, ask each buyer for a review, and spend up to $60 on ads once ten jobs are done.",
        "Keep $40 for hosting and fees, and drop any channel that brings no paying buyer within a week.",
    ]
)

# Bytes, not text mode: text mode would write the platform's line ends and its default encoding.
with open(os.path.join(OUTPUT_DIR, "entry.txt"), "wb") as f:
    f.write(PLAN.encode("utf-8"))
