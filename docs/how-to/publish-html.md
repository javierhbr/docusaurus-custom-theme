---
sidebar_position: 1
title: Publish static HTML
slug: /how-to/publish-html
description: Add standalone HTML documents to the library and site search.
---

Publish an existing HTML document without rewriting it as Markdown. The site keeps the original file and creates a searchable text version for the HTML Library.

## Add a document

Place an `.html` or `.htm` file in `static/html/`. Subfolders are supported, and filenames must resolve to unique page paths.

Give the document a meaningful `<title>` and a `<meta name="description">`. Put the readable content inside `<main>` or `<article>` when possible.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Release checklist</title>
    <meta name="description" content="Steps to verify before publishing a release.">
  </head>
  <body>
    <main>
      <h1>Release checklist</h1>
      <p>Confirm the documentation matches the release.</p>
    </main>
  </body>
</html>
```

## Build and preview

Run `npm run preview` to build the site, refresh the HTML Library, and generate the search index. Stop an existing preview on port 3001 first.

For `static/html/release-checklist.html`, the original file is available at `/html/release-checklist.html`, and the searchable reading page is at `/how-to/html/release-checklist`.

The library refreshes when the Docusaurus configuration loads. Restart the development server after adding or editing HTML files. Full-text search requires a production build.

## What is indexed

The reading page contains extracted headings, paragraphs, lists, code blocks, and table text. Scripts, navigation, hidden elements, and styling are excluded. Interactive elements and the original layout remain available through **Open original HTML**.

Files marked with `<meta name="robots" content="noindex">` are left out of the library and search. The original static file remains publicly accessible; this is not access control.

Generated reading pages live in `docs/how-to/generated/`. Edit the original HTML files, not those generated pages. Removing an HTML file removes its reading page from the next build.
