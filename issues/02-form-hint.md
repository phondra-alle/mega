# booking-v3 displays a month-first hint but reads day-first tenant input

Status: proposed work item; not an accepted engineering decision.

## Report count and scope

33 unique reports from the #4471 export, covering three tenants using booking-v3
with day-first locales. Counted once per report ID.

These counts describe the export dated 2026-10-04, not the live support queue.

## Problem

The date-field hint says `MM/DD/YYYY`, but the form reads input using the tenant's
day-first order. Following the displayed instruction can therefore select the
wrong date. This is a different input path from the shared parser issue.

## Evidence

- `DATE_HINT['booking-v3']` is `MM/DD/YYYY`.
- `causeOf` assigns form submissions for day-first booking-v3 tenants to `hint`.
- R-41230, R-41241 and R-41251 are examples in this group.
- The affected tenant directory entries are alder.physio, copper.studio and
  pale.harbour.
- Intake labelled 15 of these reports `parser` and 18 `hint`. Counting only
  reports tagged `hint` would omit part of this issue.
- Reports span 2026-04-17 through 2026-09-22 in this export.

## Expected result

The displayed date-format instruction and the form's interpretation agree.
A person following the instruction obtains the intended date.

## Boundaries and uncertainty

An app or email report for the same tenant does not establish this form-hint
problem. Neither a matching subject nor browser locale is sufficient evidence.
The mechanism is documented by the supplied KB logic; production behavior has
not been independently reproduced.
