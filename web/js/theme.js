/**
 * enkoda — Theme Management
 * Handles dark/light mode switching and system preference detection.
 */

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Function to get the preferred theme
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }

    // Check system preference
    if (
      globalThis.matchMedia &&
      globalThis.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    // Default to light
    return "light";
  };

  // Function to update ARIA label for accessibility
  const updateAriaLabel = (theme) => {
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Toggle light mode" : "Toggle dark mode",
      );
    }
  };

  // Initial theme setup
  let currentTheme = htmlElement.getAttribute("data-theme") ||
    getPreferredTheme();
  if (!htmlElement.hasAttribute("data-theme")) {
    htmlElement.setAttribute("data-theme", currentTheme);
  }
  updateAriaLabel(currentTheme);

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      htmlElement.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
      updateAriaLabel(currentTheme);
    });
  }

  // Listen for system theme changes
  if (globalThis.matchMedia) {
    globalThis.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      (e) => {
        if (!localStorage.getItem("theme")) {
          currentTheme = e.matches ? "dark" : "light";
          htmlElement.setAttribute("data-theme", currentTheme);
          updateAriaLabel(currentTheme);
        }
      },
    );
  }
});
