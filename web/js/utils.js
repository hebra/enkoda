/**
 * enkoda — Utils
 */

/**
 * Shows a toast notification
 * @param {string} message
 * @param {string} type - 'success', 'error', or 'info'
 */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "opacity 0.3s, transform 0.3s";
    setTimeout(() => {
      container.removeChild(toast);
    }, 300);
  }, 3000);
}

/**
 * Updates character count for an element
 * @param {string} text
 * @param {string} elementId
 */
// deno-lint-ignore no-unused-vars
function updateCharCount(text, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = `${text.length} character${
      text.length === 1 ? "" : "s"
    }`;
  }
}

/**
 * Copies text to clipboard
 * @param {string} text
 */
// deno-lint-ignore no-unused-vars
async function copyToClipboard(text) {
  if (!text) {
    showToast("Nothing to copy!", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!", "success");
  } catch (err) {
    console.error("Failed to copy: ", err);
    showToast("Failed to copy to clipboard", "error");
  }
}

/**
 * Downloads text as a file
 * @param {string} text
 * @param {string} filename
 */
// deno-lint-ignore no-unused-vars
function downloadText(text, filename = "enkoda-result.txt") {
  if (!text) {
    showToast("Nothing to download!", "error");
    return;
  }

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Download started", "success");
}
