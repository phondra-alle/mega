# Local review preview

This is an analysis for the course exercise. Nothing here establishes a shipped
production fix or a current live support count.

## Run

Requires Node.js 22.18 or newer.

```sh
npm ci --registry=https://registry.npmjs.org
npm run check
npm run render
npm run preview -- --port 4173
```

Open `/4471-review.html` on the local preview server for the standalone static
render, or `/kb/incidents/4471-review` for the client-rendered preview.

- Source: `src/routes/kb/incidents/4471-review/+page.svx`.
- Derived table: `src/lib/kb/Review4471.svelte`.
- Standalone HTML: `rendered/4471-review.html`, generated from real components.
- Signature is the course-issued proof, published with the account owner’s approval.
- Existing source data and accepted decisions remain unchanged.

The standalone page contains inline styles and does not need JavaScript.
Links to the other KB routes work when served alongside the local preview;
opening the HTML alone does not provide those other pages.

## Dependency audit

The installation audit on 2026-10-28 reported two low-severity entries:
`deepmerge` and its dependent `@sveltejs/vite-plugin-svelte`.
The registry reported no fix available. These are local build dependencies,
not scripts or dependencies required by the standalone rendered HTML.

Before publishing, review the exact file list. Do not copy the parent working
directory, local logs, credentials, machine configuration, or other exercises.
