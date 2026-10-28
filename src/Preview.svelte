<script>
  import Analysis from './routes/kb/incidents/4471-review/+page.svx';

  const pages = import.meta.glob('/src/routes/kb/**/+page.svx', { eager: true });
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const Page = pages[`/src/routes${path}/+page.svx`]?.default ?? Analysis;
</script>

<Page />
