# Agent Guidelines: enkoda (Base64/Base32 Converter Project)

## Project Overview
enkoda is a lightweight, static web utility for encoding and decoding text in Base64 and Base32 formats. It prioritizes speed, accessibility, and zero-dependency implementation.

## Tech Stack
- **Core**: HTML5 (Semantic), CSS3 (Grid/Flexbox/Custom Properties), Vanilla JavaScript (ES6+).
- **Prohibited**: React, Vue, Tailwind, Bootstrap, TypeScript, Build tools (Webpack/Vite), HTMX.
- **Infrastructure**: Deno (for `serve.ts`), Makefile for task automation.

## Core Architecture
The project follows a **Modular Vanilla Web** pattern, avoiding any build step.

### Folder Structure
```
enkoda/
├── web/
│   ├── index.html          # Main UI and entry point
│   ├── css/
│   │   ├── styles.css      # Component and layout styles
│   │   └── variables.css   # Design system & CSS variables
│   ├── js/
│   │   ├── converter.js    # Core conversion & UI logic
│   │   ├── theme.js        # Theme management (Dark/Light)
│   │   └── utils.js        # Shared helpers (Toasts, Copy, etc.)
│   └── assets/             # Images and branding
├── AGENTS.md               # Instruction manual for AI agents
├── LICENSE                 # GNU GPL v3 License
├── Makefile                # Automation (e.g., make serve)
├── README.md               # Project documentation
└── serve.ts                # Deno-based dev server
```

### Module Responsibilities
- **`converter.js`**: Pure conversion functions + event listeners for the form. Synchronizes dynamic labels (e.g., "Source Text (Plain Text)") and character counts.
- **`theme.js`**: Handles theme persistence in `localStorage` and toggling. Prevents Flash of Unstyled Content (FOUC) via inline script in `index.html`.
- **`utils.js`**: Provides UI-agnostic helpers like `showToast`, `copyToClipboard`, and `updateCharCount`.

## Coding Standards

### General Rules
- **Language**: Use **British English** consistently (`colour`, `centre`, `organisation`).
- **Naming**: Use camelCase for JS, kebab-case for CSS classes, and semantic IDs for unique elements.

### HTML Standards
- Use semantic tags (`<main>`, `<section>`, `<form>`, `<label>`).
- All inputs must have associated `<label>` elements via `for`/`id`.
- Maintain ARIA attributes for dynamic content (e.g., `aria-live="polite"` for errors).

### CSS Standards
- **Mobile-First**: Always define mobile styles first, then use `@media` for larger screens.
- **Theming**: Use CSS Custom Properties defined in `variables.css`.
- **Specificity**: Avoid `!important`. Use BEM or simple semantic classes.

### JavaScript Standards
- **No Dependencies**: Do not add external libraries.
- **Functional Approach**: Prefer pure functions for conversion logic.
- **DOM Manipulation**: Keep DOM updates separate from calculation logic.
- **Error Handling**: Use `try...catch` for decodes and show user-friendly errors via `errorMessage` element.

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

## Changelog
### v1.1 (2026-03-04)
- **Architecture**: Added `theme.js` for theme management.
- **Features**: Integrated dynamic labeling for source/result text based on conversion state.
- **UI**: Added Swap, Clear, and Download buttons; added character counts.
- **Organization**: Refined project structure and clarified script loading order.
- **Legal**: Corrected license reference from MIT to GNU GPL v3.

### v1.0 (2026-03-03)
- Initial guidelines for pure HTML/CSS/JS stack.
- Established Base64 and Base32 conversion requirements.
- Defined accessibility and performance targets.

---
**Last Updated**: 2026-03-04
