# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 review deliverables

- [Reviewed incident page source](src/routes/kb/incidents/4471-review/+page.svx)
- [Standalone rendered page](rendered/4471-review.html) — download and open as HTML
- [How to reproduce and check the render](PREVIEW.md)
- [Parser: 374 allocated reports](https://github.com/phondra-alle/mega/issues/1)
- [Form hint: 33 reports](https://github.com/phondra-alle/mega/issues/2)
- [Investigation: 5 reports](https://github.com/phondra-alle/mega/issues/3)

The proposed work allocation is 374 + 33 + 5 = 412. The supplied classifier's
original grouping is 379 parser + 33 hint. Five flagged exceptions were set
aside from the parser group, not counted twice. Investigation is not a confirmed
third root cause. Counts refer to the 2026-10-04 export, not a live queue.

The original export README, source data, and accepted decision remain intact
above or in their original paths. The added page uses a non-personal signature.
