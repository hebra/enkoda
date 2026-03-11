# Agent Guidelines: enkoda (Base64/Base32 Converter Project)

## Project Overview
enkoda is a lightweight, static web utility for encoding and decoding text in Base64 and Base32 formats. It prioritizes speed, accessibility, and zero-dependency implementation.

## Tech Stack
- **Core**: HTML5 (Semantic), CSS3 (Grid/Flexbox/Custom Properties), Vanilla JavaScript (ES6+).
- **Prohibited**: React, Vue, Tailwind, Bootstrap, TypeScript, Build tools (Webpack/Vite), HTMX.
- **Infrastructure**: Deno (for `serve.ts`), Makefile for task automation.
- **Documentation**: Markdown with Mermaid (v11+) for architectural diagrams.

## Core Architecture
The project follows a **Modular Vanilla Web** pattern, avoiding any build step. It relies on native browser features for encoding/decoding and theme management.

### Folder Structure
```
enkoda/
├── web/
│   ├── index.html          # Main application entry point (UI and structure)
│   ├── css/
│   │   ├── styles.css      # Component and layout styles
│   │   └── variables.css   # Design system & CSS variables (theming)
│   ├── js/
│   │   ├── converter.js    # Core conversion & UI logic (Base64/Base32)
│   │   ├── theme.js        # Theme management (Dark/Light persistence)
│   │   └── utils.js        # Shared helpers (Toasts, Copy, Download)
│   └── assets/             # Images and branding (e.g., enkoda.png)
├── AGENTS.md               # Instruction manual for AI agents
├── LICENSE                 # GNU GPL v3 Licence
├── Makefile                # Automation (e.g., make serve, make lint)
├── README.md               # Project documentation (with Mermaid diagrams)
└── serve.ts                # Deno-based development server
```

### Module Responsibilities
- **`web/js/converter.js`**: Pure conversion functions + event listeners for the form. Synchronizes dynamic labels (e.g., "Source Text (Plain Text)") and character counts. Handles UTF-8 safe Base64 via `encodeURIComponent`/`unescape`.
- **`web/js/theme.js`**: Handles theme persistence in `localStorage` and toggling. Prevents Flash of Unstyled Content (FOUC) via inline script in `web/index.html`.
- **`web/js/utils.js`**: Provides UI-agnostic helpers like `showToast`, `copyToClipboard`, `downloadText`, and `updateCharCount`.

## Coding Standards

### General Rules
- **Language**: Use **British English** consistently (`colour`, `centre`, `organisation`).
- **Naming**: Use camelCase for JS, kebab-case for CSS classes, and semantic IDs for unique elements.
- **Documentation**: Use Mermaid for any architectural or workflow diagrams in Markdown files.

### HTML Standards
- Use semantic tags (`<main>`, `<section>`, `<form>`, `<label>`).
- All inputs must have associated `<label>` elements via `for`/`id`.
- Maintain ARIA attributes for dynamic content (e.g., `aria-live="polite"` for errors).

### CSS Standards
- **Mobile-First**: Always define mobile styles first, then use `@media` for larger screens.
- **Theming**: Use CSS Custom Properties defined in `web/css/variables.css`.
- **Syntax**: Use modern CSS features like the slash notation for transparency (e.g., `rgb(0 0 0 / 0.1)`).
- **Specificity**: Avoid `!important`. Use BEM or simple semantic classes.

### JavaScript Standards
- **No Dependencies**: Do not add external libraries. Use native DOM APIs and `fetch` if needed.
- **Functional Approach**: Prefer pure functions for conversion logic.
- **DOM Manipulation**: Keep DOM updates separate from calculation logic where possible.
- **Error Handling**: Use `try...catch` for decodes and show user-friendly errors via the `errorMessage` element.
- **Linter**: Respect `deno-lint-ignore` where necessary for global functions shared between modules.

## Agent Constraints

### Dos and Don'ts
- ✅ **Do**: Use `textContent` or `value` to prevent XSS.
- ✅ **Do**: Update labels and character counts in real-time.
- ✅ **Do**: Ensure focus indicators are visible for keyboard navigation.
- ❌ **Don't**: Use `innerHTML` with user-provided input.
- ❌ **Don't**: Introduce any build process or transpilation.
- ❌ **Don't**: Modify the folder structure without explicit approval.

### Performance & Browser Support
- **Page Size**: Keep total size < 100KB.
- **Support**: Target last 2 versions of Chrome, Firefox, Safari, and Edge.
- **Speed**: Target < 1.5s First Contentful Paint.

## Mode-Specific Instructions

### [CODE] Mode
- **Implementation**: When adding new features or fixing bugs, ensure character counts and labels are updated. Use British English for all UI text and comments.
- **Validation**: Run `make lint` to ensure code quality. Ensure no regressions in UTF-8 support for Base64.
- **Security**: Never use `innerHTML` for input reflections.

### [ARCHITECT] / [ADVANCED_CHAT] Mode
- **Analysis**: Refer to the Mermaid diagrams in `README.md` for understanding the data flow and structure.
- **Design**: Propose changes that respect the "no-dependency" and "no-build" constraints. Focus on native browser capabilities.

### [SETUP] / [RUN_VERIFY] Mode
- **Execution**: Use `make serve` to start the local development server at `http://localhost:8000`.
- **Environment**: Ensure Deno is installed for local development tasks like linting and formatting (`make lint`, `make format`).

## Changelog
### v1.2 (2026-03-11)
- **Documentation**: Integrated Mermaid diagram standards and instructions.
- **Modes**: Added explicit mode-specific instructions for AI agents.
- **Refinement**: Switched to explicit file paths for all modules and components.
- **Tech Stack**: Formalised Deno and Makefile tooling in the tech stack.
- **CSS**: Standardised modern CSS syntax usage (e.g., slash transparency notation).

### v1.1 (2026-03-04)
- **Architecture**: Added `theme.js` for theme management.
- **Features**: Integrated dynamic labeling for source/result text based on conversion state.
- **UI**: Added Swap, Clear, and Download buttons; added character counts.
- **Organization**: Refined project structure and clarified script loading order.
- **Legal**: Corrected licence reference from MIT to GNU GPL v3.

### v1.0 (2026-03-03)
- Initial guidelines for pure HTML/CSS/JS stack.
- Established Base64 and Base32 conversion requirements.
- Defined accessibility and performance targets.

---
**Last Updated**: 2026-03-11
