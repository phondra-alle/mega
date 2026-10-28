import fs from 'node:fs';
import assert from 'node:assert/strict';
import { uniqueById, groupByCause } from './src/lib/kb/causes.ts';
import { deskRef } from './src/lib/kb/desk-ref.ts';

const root = 'src/lib/data/';
const raw = JSON.parse(fs.readFileSync(root + 'reports-4471.json'));
const reports = uniqueById(raw).filter((r) => r.mergedInto === 4471);
const tenants = new Map(fs.readdirSync(root + 'tenants').map((file) => {
  const tenant = JSON.parse(fs.readFileSync(root + 'tenants/' + file));
  return [tenant.handle, tenant];
}));
const groups = groupByCause(reports, (r) => tenants.get(r.tenant));
const exceptions = JSON.parse(fs.readFileSync(root + 'desk-notes.json')).oneDayMove;
const parser = groups.find((g) => g.cause === 'parser').reports;
const hint = groups.find((g) => g.cause === 'hint').reports;
const allocation = [
  parser.filter((r) => !exceptions.includes(r.id)),
  hint,
  parser.filter((r) => exceptions.includes(r.id)),
];
assert.equal(raw.length - reports.length, 15);
assert.deepEqual(allocation.map((rs) => rs.length), [374, 33, 5]);
assert.equal(new Set(allocation.flat().map((r) => r.id)).size, reports.length);
assert.equal(groups.reduce((n, g) => n + g.reports
  .filter((r) => r.meta.intakeTag !== g.cause).length, 0), 38);
assert.equal(deskRef('mega-s01e03-analysis'), 'DR-S2KB-HMV7');
console.log('Verified export: 374 + 33 + 5 = 412; no double counting; signature stable.');
