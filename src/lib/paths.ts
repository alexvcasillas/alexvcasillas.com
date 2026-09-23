// With build.format 'file', Astro.url.pathname ends in `.html` at build time.
// Normalize to the public URL shape: no `.html`, no trailing slash except root.
export function cleanPath(pathname: string): string {
  const stripped = pathname.replace(/(\/index)?\.html$/, '').replace(/\/+$/, '');
  return stripped || '/';
}
