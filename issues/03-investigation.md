# Investigate five date reports not explained by an ordinary month/day swap

Status: investigation proposal; no common root cause established.

## Report count and scope

5 unique reports from #4471, explicitly listed in `desk-notes.json`:

| Report | Observed symptom |
| --- | --- |
| R-41202 | Tuesday 12 May in the invite versus Monday 11 May in the calendar. |
| R-41209 | June bookings described as one day off. |
| R-41236 | Invite allegedly arrived before the booking existed. |
| R-41344 | The same meeting appeared as Tuesday in Lisbon and Monday in Toronto. |
| R-41620 | Tuesday 6 October appeared as Monday. |

These counts describe the export dated 2026-10-04, not the live support queue.

## Why investigate

The classifier files all five under `parser` using tenant settings and channel.
It never examines their bodies. Those bodies do not establish the usual reversal
of day and month.

This draft is an investigation container, not evidence that all five reports
share one defect. In particular, R-41236 does not itself establish a one-day shift.

## What is unknown

No common root cause is proven. Timezone conversion is a possible explanation
for some symptoms, not a finding. The export does not provide the original
calendar payloads, event identifiers, timezone settings, or delivery timestamps
needed to establish the mechanism.

## Next evidence to obtain

For each report, compare the intended date/time with the original invite,
calendar display, relevant timezone settings, and event/delivery timestamps.
Separate confirmed problems if that evidence demonstrates different causes.

Do not close these reports as explained by the month/day parser issue without
evidence. Do not claim a confirmed timezone defect from these descriptions alone.
