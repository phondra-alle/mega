# Date parser swaps the day and month for day-first tenants

Status: proposed work item; not an accepted engineering decision.

## Report count and scope

374 unique reports from the #4471 export are allocated to this issue.

The supplied classifier assigns 379 reports to `parser`. Five reports listed in
`desk-notes.json` describe different or insufficiently explained symptoms and are
held in a separate investigation draft. Thus this proposed allocation is
379 − 5 = 374, not a claim that all 379 bodies establish a month/day swap.

These counts describe the export dated 2026-10-04, not the live support queue.

## Problem

The shared parser interprets numeric dates month-first, while the affected tenant
uses day-first dates. An intended 7 April becomes 4 July.

## Evidence

- R-41200: reminder intended for 7 April went out for 4 July.
- R-41203: booking for 2 December became 12 February.
- The supplied `causeOf` function uses tenant locale and channel/form to identify
  this path; it does not use the browser locale or intake tag as ground truth.
- Across the classifier's original 379-report group, 23 reports were tagged
  `hint` by intake. Tags alone therefore do not establish the issue boundary.

## Expected result

The date interpreted by the application agrees with the date intended under the
tenant's supported input format.

## Boundaries and uncertainty

Do not merge booking-v3 form-hint reports into this issue merely because their
subjects or visible date swaps match. This export contains classification logic
and reports, not the production parser implementation or a verified reproduction.
The five exceptional reports are explicitly outside this proposed allocation.

## Engineering outcome

Closed as completed based on the course engineering update dated 2026-10-05: parser FIXED, fix(dates): parse dd/mm for eu locales. Not independently reproduced; issue #3 remains unresolved.

Source: https://hq.mega.dev/challenges/what-it-shows#engineering-update
