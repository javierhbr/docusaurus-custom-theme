const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const {load} = require('cheerio');

const compact = (text) => text.replace(/\s+/g, ' ').trim();
const escapeMarkdown = (text) => text.replace(/[\\`*_{}[\]<>#!|]/g, '\\$&');

function htmlFiles(directory, prefix = '') {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) return htmlFiles(path.join(directory, entry.name), relative);
    // Never follow symlinks outside the explicitly published directory.
    return entry.isFile() && /\.html?$/i.test(entry.name) ? [relative] : [];
  }).sort();
}

function readHtml(html, filename) {
  const $ = load(html);
  const robots = $('meta[name="robots"]').attr('content') || '';
  if (/\b(noindex|none)\b/i.test(robots)) return null;
  const description = compact($('meta[name="description"]').attr('content') || '');
  const title = compact($('title').first().text() || $('h1').first().text()) || filename;
  $('script, style, template, noscript, nav, header, footer, aside, button, [hidden], [aria-hidden="true"]').remove();
  const main = $('main').first();
  const article = $('article').first();
  const body = main.length ? main : article.length ? article : $('body');
  const blocks = [];
  body.find('h1, h2, h3, h4, h5, h6, p, li, pre, table, dt, dd').each((_, element) => {
    const node = $(element);
    if (node.parents('pre, table, li').length) return;
    const text = compact(node.text());
    if (!text) return;
    if (element.tagName === 'h1' && text === title) return;
    if (element.tagName === 'pre') {
      const code = node.text().trim();
      const fence = '`'.repeat(Math.max(3, ...[...code.matchAll(/`+/g)].map((m) => m[0].length + 1)));
      blocks.push(`${fence}\n${code}\n${fence}`);
    } else if (/^h[1-6]$/.test(element.tagName)) {
      blocks.push(`${'#'.repeat(Math.max(2, Number(element.tagName[1])))} ${escapeMarkdown(text)}`);
    } else if (element.tagName === 'table') {
      const rows = node.find('tr').map((__, row) => $(row).find('th, td').map((___, cell) => compact($(cell).text())).get().join(' · ')).get();
      blocks.push(rows.map((row) => `- ${escapeMarkdown(row)}`).join('\n'));
    } else {
      blocks.push(`${element.tagName === 'li' ? '- ' : ''}${escapeMarkdown(text)}`);
    }
  });
  if (!blocks.length && compact(body.text())) blocks.push(escapeMarkdown(compact(body.text())));
  return {title, description, markdown: blocks.join('\n\n')};
}

function writeIfChanged(file, content) {
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content) {
    fs.writeFileSync(file, content);
  }
}

function syncStaticHtml(siteDir) {
  const source = path.join(siteDir, 'static/html');
  const output = path.join(siteDir, 'docs/how-to/generated');
  const pages = path.join(output, 'pages');
  fs.mkdirSync(pages, {recursive: true});
  writeIfChanged(path.join(output, '_category_.json'), JSON.stringify({
    label: 'HTML Library', position: 2, className: 'sidebar-shell-group',
  }, null, 2) + '\n');
  writeIfChanged(path.join(pages, '_category_.json'), JSON.stringify({label: 'Documents'}, null, 2) + '\n');
  const entries = [];
  const expectedFiles = new Set();
  const slugs = new Set();
  for (const filename of htmlFiles(source)) {
    const content = readHtml(fs.readFileSync(path.join(source, filename), 'utf8'), filename);
    if (!content) continue;
    const slug = filename.replace(/\.html?$/i, '').split('/').map((segment) => segment.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-|-$/g, '') || 'page').join('/');
    if (slugs.has(slug)) throw new Error(`Static HTML files resolve to the same page: ${slug}. Rename one of the files.`);
    slugs.add(slug);
    const id = createHash('sha256').update(filename).digest('hex').slice(0, 16);
    const outputName = `${id}.md`;
    const originalUrl = `/html/${filename.split('/').map(encodeURIComponent).join('/')}`;
    const readerUrl = `/how-to/html/${slug}`;
    const frontMatter = ['---', `title: ${JSON.stringify(content.title)}`, `slug: ${JSON.stringify(readerUrl)}`, `description: ${JSON.stringify(content.description || `Text version of ${content.title}.`)}`, '---'].join('\n');
    const originalLink = `<a href={useBaseUrl(${JSON.stringify(originalUrl)})}>Open original HTML</a>`;
    // Original HTML stays a static asset. Only extracted text enters the docs renderer.
    const markdown = `${frontMatter}\n\nimport useBaseUrl from '@docusaurus/useBaseUrl';\n\n${originalLink}\n\n${content.markdown}\n`;
    writeIfChanged(path.join(pages, outputName), markdown);
    expectedFiles.add(outputName);
    entries.push({...content, readerUrl, filename});
  }
  for (const file of fs.readdirSync(pages)) {
    if (/^[a-f0-9]{16}\.md$/.test(file) && !expectedFiles.has(file)) fs.unlinkSync(path.join(pages, file));
  }
  entries.sort((a, b) => a.title.localeCompare(b.title));
  const list = entries.length
    ? entries.map((entry) => `## [${escapeMarkdown(entry.title)}](${entry.readerUrl})\n\n${escapeMarkdown(entry.description || `Read ${entry.title}.`)}\n`).join('\n')
    : 'No HTML pages have been published yet. Follow [Publish static HTML](../publish-html.md) to add the first page.\n';
  writeIfChanged(path.join(output, 'index.md'), `---\ntitle: HTML Library\nslug: /how-to/html\ndescription: Browse and search standalone HTML documents.\n---\n\nBrowse standalone HTML documents. Each page has a searchable text version and a link to the original file.\n\n${list}\n`);
  return entries;
}

module.exports = {syncStaticHtml, readHtml};
