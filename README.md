# enkoda — Base64 & Base32 Converter

A simple, fast, and accessible static website for encoding and decoding text using Base64 and Base32 formats.

## Features

- **Base64 Conversion:** Encode and decode text with UTF-8 support.
- **Base32 Conversion:** Full RFC 4648 compliant Base32 support.
- **Real-time Conversion:** Results update instantly as you type.
- **Responsive Design:** Works beautifully on mobile, tablet, and desktop.
- **Dark Mode Support:** Automatically adjusts to your system theme.
- **Accessibility:** Screen reader friendly and keyboard navigable.
- **Privacy:** All conversions happen locally in your browser. No data is sent to any server.
- **Utility Tools:**
  - Copy to clipboard
  - Download result as text file
  - Character counting for input and output
  - Swap input and output
  - Error handling for invalid inputs

## Local Development

You can serve the project locally using the provided Deno script.

### Prerequisites

- [Deno](https://deno.land/) (optional, for local server and formatting)

### Running the Server

```bash
make serve
```

Alternatively:

```bash
deno run --allow-net --allow-read serve.ts
```

The site will be available at `http://localhost:8000`.

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Deno (for local development server)

## Project Structure

```
enkoda/
├── web/
│   ├── index.html      # Main application entry point
│   ├── css/
│   │   ├── styles.css    # Core styles and layout
│   │   └── variables.css # Theme variables
│   ├── js/
│   │   ├── converter.js # Encoding/decoding logic
│   │   └── utils.js     # Helper functions
│   └── assets/
│       └── enkoda.png   # Project icon
├── AGENTS.md           # AI Agent guidelines
├── Makefile            # Common tasks
├── README.md           # This file
└── serve.ts            # Deno development server
```

## Licence

MIT
