---
title: Overview
slug: /
description: A design-led Docusaurus reference shell with tokenized theming.
displayed_sidebar: referenceSidebar
---

# Overview

This starter turns Docusaurus into a polished reference site with a custom docs shell, TypeScript theme overrides, and a single CSS token layer that controls the palette.

## What ships with the theme

- A centered search experience with keyboard shortcut support.
- A reference-style navbar, docs sidebar, and table of contents rail.
- Badge-ready sidebar items for states like `New` and `Deprecated`.
- A master token file in `src/css/custom.css` for fast color swaps.

## Layout model

The shell is organized around three persistent rails:

1. A sticky top navigation bar for brand, search, global sections, and utility controls.
2. A left documentation sidebar with grouped navigation and metadata badges.
3. A right context rail for page anchors and lightweight feedback.

## Customization

Update the variables at the top of `src/css/custom.css` to restyle the entire experience:

- Brand and accent colors
- Surface and border colors
- Typography choices
- Radius, shadows, and shell spacing

## Where to start

- Open the `useCallback` reference to see the finished shell in its intended layout.
- Review `src/theme/Navbar/Content/index.tsx` for the top navigation customization.
- Review `src/theme/TOC/index.tsx` for the right-side reference rail.
