<script lang="ts">
  import raw from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const reports = uniqueById(raw as Report[]).filter((r) => r.mergedInto === 4471);
  const groups = groupByCause(reports, tenantOf);
  const parser = groups.find((g) => g.cause === 'parser')?.reports ?? [];
  const hint = groups.find((g) => g.cause === 'hint')?.reports ?? [];
  const exceptional = parser.filter((r) => notes.oneDayMove.includes(r.id));
  const ordinary = parser.filter((r) => !notes.oneDayMove.includes(r.id));
  const unplaced = groups.find((g) => g.cause === 'unplaced')?.reports ?? [];
  const disagreement = groups.reduce(
    (n, g) => n + g.reports.filter((r) => r.meta.intakeTag !== g.cause).length, 0,
  );
</script>

<p>
  Export rows: <strong>{raw.length}</strong> · unique reports in #4471:
  <strong>{reports.length}</strong> · repeated rows: <strong>{raw.length - reports.length}</strong>.
</p>

<table aria-label="Proposed non-overlapping report allocation">
  <thead><tr><th>Work item</th><th>Reports</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>Shared date parser</td><td>{ordinary.length}</td><td>Parser-classified, excluding the flagged exceptions.</td></tr>
    <tr><td>booking-v3 hint mismatch</td><td>{hint.length}</td><td>Form hint and tenant date order disagree.</td></tr>
    <tr><td>Investigation, not a confirmed common cause</td><td>{exceptional.length}</td><td>Flagged reports not explained by an ordinary month/day swap.</td></tr>
    {#if unplaced.length}
      <tr><td>Unplaced: needs triage</td><td>{unplaced.length}</td><td>Insufficient tenant context.</td></tr>
    {/if}
  </tbody>
</table>

<p>
  The supplied classifier groups <strong>{parser.length}</strong> reports under parser and
  <strong>{hint.length}</strong> under hint. The <strong>{exceptional.length}</strong>
  investigation reports are already part of the parser group, not additional reports.
  Intake tags disagree with the supplied classifier in <strong>{disagreement}</strong> reports.
</p>

<h3>Read the exceptions before assigning a cause</h3>
<table aria-label="Reports requiring investigation">
  <thead><tr><th>Report</th><th>Original description</th></tr></thead>
  <tbody>
    {#each exceptional as report (report.id)}
      <tr><td><code>{report.id}</code></td><td>{report.body}</td></tr>
    {/each}
  </tbody>
</table>

<p>
  Neither this table nor the supplied classifier proves a shared root cause for these
  exceptions. R-41236 does not itself establish a one-day shift.
</p>
