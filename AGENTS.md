# Agent Guidelines: enkoda (Base64/Base32 Converter Project)

## Project Overview

This document serves as the source of truth for all AI agents working on the enkoda project. It defines the technical stack, requirements, standards, and implementation guidelines.

## Project Type

Static website that allows Base64 and Base32 encoding and decoding of text.

## Technology Stack

### Core Technologies (Mandatory)

- **HTML5** - Semantic markup, native form validation
- **CSS3** - Modern CSS with Grid, Flexbox, Custom Properties
- **Vanilla JavaScript (ES6+)** - No frameworks, native DOM manipulation

### Prohibited Technologies

- ❌ React, Vue, Angular, or any JavaScript frameworks
- ❌ Tailwind CSS, Bootstrap, or heavy CSS frameworks
- ❌ TypeScript (keep it simple with vanilla JS)
- ❌ Build tools (Webpack, Vite, etc.) - no build process required
- ❌ HTMX (requires server, not suitable for static sites)

### Optional Lightweight Enhancements

**Minimal CSS Framework (Optional):**
- **Pico CSS** (~10KB) - Minimal, semantic, classless
- **Simple.css** (~4KB) - Classless styling, drop-in solution
- **Water.css** (~2KB) - Classless, dark mode support
- **None** - Custom CSS preferred

**Icons (Optional):**
- Feather Icons or Heroicons (SVG)
- Unicode symbols (✓, ✗, ⚠, 📊) - Zero dependencies

## Project Structure

```
enkoda/
├── web/
│   ├── index.html
│   ├── css/
│   │   ├── styles.css
│   │   └── variables.css (optional)
│   ├── js/
│   │   ├── converter.js
│   │   └── utils.js (optional)
│   └── assets/
│       └── enkoda.png
├── AGENTS.md (this file)
├── Makefile
├── README.md
└── serve.ts (Deno server)
```

## Core Requirements

### Converter Functionality

**Required Inputs:**
- Text area for source text
- Conversion type selector (Base64, Base32)
- Conversion direction (Encode, Decode)

**Required Outputs:**
- Text area for result text
- Copy-to-clipboard functionality for results
- Character count for input and output (optional)

**Calculation Logic:**
- Use native `btoa()` and `atob()` for Base64 (with UTF-8 support handling)
- Use a lightweight, zero-dependency utility or custom implementation for Base32

### User Experience Requirements

**Input Validation:**
- Handle invalid input for decoding (e.g., non-Base64/Base32 characters)
- Provide clear error messages
- Show "Empty" or placeholder state when no input is provided

**Interaction Patterns:**
- Real-time conversion (on input change) OR button-triggered conversion
- Clear/reset button to restore defaults
- Swap button (to move result to input)
- Responsive design (mobile-first approach)
- Keyboard navigation support
- Print-friendly styles

**Visual Feedback:**
- Success/error states
- Smooth transitions (CSS only)
- Clear visual hierarchy
- Toast notifications for user actions (e.g., copying results)

### Accessibility Requirements (Mandatory)

- Semantic HTML5 elements (`<main>`, `<section>`, `<form>`, `<label>`)
- Proper form labels associated with inputs
- ARIA attributes where needed (`aria-label`, `aria-describedby`)
- Keyboard navigation (tab order, enter to submit)
- Focus indicators (visible focus states)
- Screen reader friendly (test with screen readers)
- Sufficient colour contrast (WCAG AA minimum)

### Responsive Design Requirements

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Approach:**
- Mobile-first CSS
- CSS Grid for layout
- Flexbox for component alignment
- Media queries for responsive adjustments
- Touch-friendly targets (minimum 44x44px)

## Code Standards

### HTML Standards

```html
<!-- Use semantic HTML5 -->
<main>
  <section class="converter">
    <h1>enkoda — Base64 & Base32 Converter</h1>
    <form id="converter-form">
      <label for="source-text">Source Text</label>
      <textarea id="source-text" name="source-text" required placeholder="Type or paste text here..."></textarea>
      
      <div class="controls">
        <label for="type">Format</label>
        <select id="type" name="type">
          <option value="base64">Base64</option>
          <option value="base32">Base32</option>
        </select>
        
        <label for="direction">Action</label>
        <select id="direction" name="direction">
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
      </div>
      
      <button type="submit" id="convert-btn">Convert</button>
    </form>
    
    <div id="result-container">
      <label for="result-text">Result</label>
      <textarea id="result-text" readonly></textarea>
      <button id="copy-btn">Copy to Clipboard</button>
    </div>
  </section>
</main>
```

**Rules:**
- Use semantic elements
- Include proper meta tags (viewport, description, charset)
- Add lang attribute to `<html>`
- Include favicon
- Validate HTML (W3C validator)

### CSS Standards

```css
/* Use CSS Custom Properties for theming */
:root {
  --primary-colour: #2563eb;
  --secondary-colour: #64748b;
  --background-colour: #ffffff;
  --text-colour: #1e293b;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}

/* Mobile-first approach */
.converter {
  display: grid;
  gap: var(--spacing-unit);
}

/* Tablet and above */
@media (min-width: 768px) {
  .converter {
    grid-template-columns: 1fr;
  }
}
```

**Rules:**
- Use British English spelling (colour, centre, etc.)
- Mobile-first media queries
- CSS Custom Properties for theming
- BEM or simple class naming convention
- Avoid `!important`
- Group related styles
- Comment complex calculations or hacks

### JavaScript Standards

```javascript
// Use ES6+ features
const convertBtn = document.getElementById('convert-btn');

// Event delegation where appropriate
convertBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const sourceText = document.getElementById('source-text').value;
  const type = document.getElementById('type').value;
  const direction = document.getElementById('direction').value;
  
  const result = convertText(sourceText, type, direction);
  displayResults(result);
});

// Pure functions for calculations
function convertText(text, type, direction) {
  // Conversion logic
  return result;
}

// Separate DOM manipulation
function displayResults(result) {
  // Update DOM
}
```

**Rules:**
- Use `const` and `let`, avoid `var`
- Arrow functions for callbacks
- Template literals for strings
- Destructuring where appropriate
- Pure functions for calculations
- Separate concerns (calculation vs DOM manipulation)
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Handle errors gracefully
- Validate inputs before conversion

### File Organisation

**CSS Files:**
- `variables.css` - CSS Custom Properties (optional)
- `styles.css` - Main styles

**JavaScript Files:**
- `converter.js` - Core conversion logic
- `utils.js` - Helper functions (optional)

**Loading Order:**
```html
<head>
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Content -->
  <script src="js/utils.js"></script>
  <script src="js/converter.js"></script>
</body>
```

## Local Development

For development purposes, a basic Deno server script is provided in the root directory.

**Running the server:**

```bash
make serve
```

Alternatively:

```bash
deno run --allow-net --allow-read serve.ts
```

This serves the `web/` directory at `http://localhost:8000`.

## Performance Requirements

### Target Metrics

- **Total page size:** < 100KB
- **HTML:** ~5-10KB
- **CSS:** ~10-20KB
- **JavaScript:** ~5-15KB
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 2.5s

### Optimisation Techniques

**For Production:**
- Minify CSS and JavaScript
- Compress images (if any)
- Use native lazy loading: `<img loading="lazy">`
- Inline critical CSS (optional)
- Enable gzip/brotli compression on hosting

**Code Optimisation:**
- Avoid unnecessary DOM queries (cache selectors)
- Debounce real-time conversion (if implemented)
- Use event delegation for multiple similar elements
- Minimise reflows and repaints

## Browser Support

**Target Browsers:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Progressive Enhancement:**
- Core functionality works without JavaScript (basic form, although JS is needed for client-side conversion)
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers
- Feature detection over browser detection

## Development Phases

### Phase 1: MVP (Minimum Viable Product)

**Priority: High**
- [ ] Basic HTML structure
- [ ] Simple CSS styling
- [ ] Base64 encoding/decoding logic
- [ ] Input validation
- [ ] Results display
- [ ] Responsive layout

**Deliverable:** Working Base64 converter with basic styling

### Phase 2: Enhancements

**Priority: Medium**
- [ ] Base32 encoding/decoding logic
- [ ] Improved styling and UX
- [ ] Copy results to clipboard
- [ ] Accessibility improvements
- [ ] Error handling refinements (Toast notifications)
- [ ] Dark mode support

**Deliverable:** Polished, accessible converter with Base32 support

### Phase 3: Advanced Features

**Priority: Low**
- [ ] Swap button (result to input)
- [ ] Download results as text file
- [ ] History of recent conversions (localStorage)
- [ ] Multiple output formats (Hex, Binary)
- [ ] Support for file uploads for conversion

**Deliverable:** Feature-rich text utility site

## Hosting & Deployment

### Recommended Hosting

**Primary Recommendation: GitHub Pages**
- Free static hosting
- Version controlled
- Custom domain support
- HTTPS enabled
- Simple deployment

**Alternatives:**
- Netlify - Drag-and-drop deployment
- Vercel - Fast deployment, excellent performance
- Cloudflare Pages - Global CDN
- Surge.sh - Simple CLI deployment

### Deployment Process (GitHub Pages)

1. Create GitHub repository
2. Push code to `main` branch
3. Enable GitHub Pages in repository settings
4. Select source: `main` branch, `/web` folder (or adjust based on hosting requirements)
5. Site live at `username.github.io/repo-name/web`

### Custom Domain (Optional)

1. Add `CNAME` file with domain name
2. Configure DNS records with domain provider
3. Enable HTTPS in GitHub Pages settings

## Testing Requirements

### Manual Testing Checklist

**Functionality:**
- [ ] Base64 encoding/decoding produces correct results
- [ ] Base32 encoding/decoding produces correct results
- [ ] Input validation works correctly
- [ ] Clear/reset button works
- [ ] Copy to clipboard functionality works
- [ ] Result area is properly formatted

**Responsive Design:**
- [ ] Mobile layout (< 768px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Desktop layout (> 1024px)
- [ ] Touch targets adequate size

**Browser Testing:**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] Colour contrast sufficient
- [ ] Form labels associated

**Performance:**
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Conversions are fast
- [ ] No memory leaks

### Validation Tools

- **HTML:** W3C Markup Validation Service
- **CSS:** W3C CSS Validation Service
- **Accessibility:** WAVE, axe DevTools
- **Performance:** Lighthouse, PageSpeed Insights
- **Cross-browser:** BrowserStack (optional)

## Documentation Requirements

### README.md

Must include:
- Project description
- Features list
- Live demo link
- Installation/setup instructions
- Usage instructions
- Technologies used
- Browser support
- Licence

### Code Comments

**When to comment:**
- Complex conversion logic or algorithms
- Non-obvious logic
- Browser-specific hacks or workarounds
- Public API functions (JSDoc)

**When NOT to comment:**
- Self-explanatory code
- Obvious functionality
- Redundant descriptions

## Security Considerations

**Input Sanitisation:**
- Validate all user inputs
- Prevent XSS (avoid `innerHTML` with user input)
- Use `textContent` or `value` for displaying user data

**Best Practices:**
- No sensitive data in client-side code
- No API keys or credentials
- Use HTTPS for hosting
- Content Security Policy headers (optional)

## Common Pitfalls to Avoid

### JavaScript

❌ **Don't:**
```javascript
// Using innerHTML with user input
element.innerHTML = userInput;

// Not handling Base64/Base32 decode errors
const decoded = atob(userInput); // Could throw an exception
```

✅ **Do:**
```javascript
// Use textContent or value for user data
element.textContent = userInput;

// Handle decode errors gracefully
try {
  const decoded = atob(userInput);
} catch (e) {
  showError('Invalid Base64 input');
}
```

### CSS

❌ **Don't:**
```css
/* Using !important unnecessarily */
.button {
  color: red !important;
}

/* Not using CSS variables */
.primary-button {
  background: #2563eb;
}
```

✅ **Do:**
```css
/* Use specificity correctly */
.button.primary {
  color: red;
}

/* Use CSS Custom Properties */
:root {
  --primary-colour: #2563eb;
}
.primary-button {
  background: var(--primary-colour);
}
```

### HTML

❌ **Don't:**
```html
<!-- Missing labels -->
<textarea placeholder="Source text"></textarea>

<!-- Inline styles -->
<div style="color: red;">Error</div>
```

✅ **Do:**
```html
<!-- Proper labels -->
<label for="source-text">Source Text</label>
<textarea id="source-text" name="source-text"></textarea>

<!-- External styles -->
<div class="error-message">Error</div>
```

## Agent Responsibilities

### When Creating New Files

1. Follow the project structure defined above
2. Use British English spelling consistently
3. Include proper file headers/comments
4. Validate code before committing
5. Test functionality thoroughly

### When Modifying Existing Files

1. Maintain existing code style
2. Don't introduce frameworks or heavy dependencies
3. Preserve accessibility features
4. Test changes across browsers
5. Update documentation if needed

### When Reviewing Code

1. Check adherence to these guidelines
2. Verify conversions are mathematically correct
3. Ensure accessibility standards are met
4. Confirm responsive design works
5. Validate performance requirements

## Questions & Clarifications

If uncertain about any requirement:

1. Refer to this document first
2. Check existing code patterns
3. Ask the user for clarification
4. Document the decision made
5. Update this file if needed

## Version History

- **v1.0** (2026-03-03) - Initial guidelines established
  - Pure HTML/CSS/JavaScript stack
  - No frameworks or build tools
  - Focus on simplicity and performance
  - Comprehensive accessibility requirements
  - Base64 and Base32 conversion requirements

---

**Last Updated:** 2026-03-03  
**Document Owner:** Project Team  
**Review Frequency:** As needed based on project evolution
