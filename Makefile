# enkoda — Makefile

.PHONY: serve format lint help

help:
	@echo "Available commands:"
	@echo "  make serve   - Start Deno development server"
	@echo "  make format  - Format JS and CSS files (requires deno)"
	@echo "  make lint    - Lint JS and CSS files (requires deno)"

serve:
	deno run --allow-net --allow-read serve.ts

format:
	deno fmt web/js/ web/css/

lint:
	deno lint web/js/
