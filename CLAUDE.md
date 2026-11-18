# CLAUDE.md

Guidance for Claude when working in this folder.

## Project

A personal portfolio website for Tobias, an e-commerce PPC specialist (Google Ads and Amazon Ads). The content comes from `about.md`.

## File Structure

```
index.html   – page structure and content (entry point)
style.css    – all styling
app.js       – all interactivity
about.md     – source text for the "About" content
CLAUDE.md    – this file
```

- Keep the three code files separate: no inline `<style>` blocks, no inline `<script>` code, and no `style="..."` attributes.
- `index.html` links `style.css` in `<head>` and loads `app.js` at the end of `<body>` (or with `defer`).

## How the Site Is Opened

The site is opened by **double-clicking `index.html` so it opens in Chrome** (`file://`). There is no web server and no build step. So:

- Use plain HTML, CSS and vanilla JavaScript. No frameworks, bundlers, npm or TypeScript.
- Don't use `type="module"` scripts, `import`/`export`, or `fetch()` for local files. Chrome blocks these over `file://`.
- Write content directly into `index.html` instead of loading `about.md` at runtime.
- Use relative paths only (`style.css`, `app.js`, `images/...`).
- External resources like Google Fonts are fine, but the page must still work without them.

To open it from the terminal:

```bash
open -a "Google Chrome" index.html
```

## Coding Conventions

- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`) with accessible markup: alt text, labels, good contrast.
- Responsive and mobile-first; the page should work from phone to desktop width.
- Define colours, fonts and spacing as CSS custom properties on `:root`.
- Write the JavaScript small, readable and commented where something isn't obvious.
- Site language: English (British spelling, matching `about.md`).

## Working Rules: Ask Before Rewriting

- **Before rewriting or changing existing code** in `index.html`, `style.css` or `app.js`, Claude must **ask Tobias for permission first** and explain:
  1. what it wants to change,
  2. why, and
  3. which files and sections are affected.
- Wait for a clear "yes" before making the change.
- Creating a new file that was explicitly requested doesn't need extra approval. Changing it afterwards does.
- Don't change the facts in `about.md` (career, family, location) without asking.
- Don't publish personal details beyond what's in `about.md` (for example the full postcode or contact details) unless Tobias asks for it.
