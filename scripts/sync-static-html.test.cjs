const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {readHtml, syncStaticHtml} = require('./sync-static-html.cjs');

test('extracts readable content without scripts or hidden navigation', () => {
  const result = readHtml(`<title>Safe &amp; useful</title>
    <nav>Ignore navigation</nav><main><h1>Safe &amp; useful</h1>
    <p>Keep {expressions} and &lt;custom-tags&gt; as text.</p>
    <pre>const value = \\n;
\x60\x60\x60</pre><p hidden>Ignore hidden</p><script>Ignore script</script>
    <table><tr><th>Name</th><th>Value</th></tr><tr><td>Entry</td><td>42</td></tr></table></main>`, 'safe.html');
  assert.equal(result.title, 'Safe & useful');
  assert.match(result.markdown, /\\\{expressions\\\}/);
  assert.match(result.markdown, /\\<custom-tags\\>/);
  assert.match(result.markdown, /````\n/);
  assert.match(result.markdown, /Entry · 42/);
  assert.doesNotMatch(result.markdown, /Ignore/);
  assert.equal(readHtml('<meta name="robots" content="NOINDEX, FOLLOW"><p>Private</p>', 'hidden.html'), null);
});

test('creates nested entries and removes stale generated pages', (t) => {
  const site = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-html-test-'));
  t.after(() => fs.rmSync(site, {recursive: true, force: true}));
  const source = path.join(site, 'static/html/guides');
  fs.mkdirSync(source, {recursive: true});
  fs.writeFileSync(path.join(source, 'Release Notes.html'), '<title>Release notes</title><main><p>Unique searchable text.</p></main>');
  fs.writeFileSync(path.join(source, 'excluded.html'), '<meta name="robots" content="noindex"><p>Excluded</p>');
  fs.symlinkSync(path.join(source, 'Release Notes.html'), path.join(source, 'linked.html'));
  const entries = syncStaticHtml(site);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].readerUrl, '/how-to/html/guides/release-notes');
  const pages = path.join(site, 'docs/how-to/generated/pages');
  const generated = fs.readFileSync(path.join(pages, fs.readdirSync(pages).find((file) => file.endsWith('.md'))), 'utf8');
  assert.match(generated, /guides\/Release%20Notes.html/);
  assert.match(generated, /Unique searchable text/);
  fs.unlinkSync(path.join(source, 'Release Notes.html'));
  assert.equal(syncStaticHtml(site).length, 0);
  assert.deepEqual(fs.readdirSync(pages), ['_category_.json']);
  assert.match(fs.readFileSync(path.join(pages, '../index.md'), 'utf8'), /No HTML pages/);
});

test('rejects files that would create the same public route', (t) => {
  const site = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-html-collision-'));
  t.after(() => fs.rmSync(site, {recursive: true, force: true}));
  const source = path.join(site, 'static/html');
  fs.mkdirSync(source, {recursive: true});
  for (const name of ['same.html', 'same.htm']) fs.writeFileSync(path.join(source, name), '<h1>Same</h1>');
  assert.throws(() => syncStaticHtml(site), /same page/);
});
