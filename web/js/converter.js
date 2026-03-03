/**
 * enkoda — Core Converter Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const sourceText = document.getElementById("source-text");
  const resultText = document.getElementById("result-text");
  const formatSelect = document.getElementById("type");
  const directionSelect = document.getElementById("direction");
  const swapBtn = document.getElementById("swap-btn");
  const clearBtn = document.getElementById("clear-btn");
  const copyBtn = document.getElementById("copy-btn");
  const downloadBtn = document.getElementById("download-btn");
  const errorMessage = document.getElementById("error-message");

  /**
   * Performs conversion based on current settings
   */
  const handleConversion = () => {
    const text = sourceText.value;
    const format = formatSelect.value;
    const direction = directionSelect.value;

    errorMessage.classList.add("hidden");
    errorMessage.textContent = "";

    if (!text) {
      resultText.value = "";
      updateCharCount("", "output-char-count");
      return;
    }

    try {
      let result = "";
      if (format === "base64") {
        result = direction === "encode"
          ? encodeBase64(text)
          : decodeBase64(text);
      } else if (format === "base32") {
        result = direction === "encode"
          ? encodeBase32(text)
          : decodeBase32(text);
      }
      resultText.value = result;
      updateCharCount(result, "output-char-count");
    } catch (err) {
      console.error("Conversion error:", err);
      errorMessage.textContent = `Error: ${err.message}`;
      errorMessage.classList.remove("hidden");
      resultText.value = "";
      updateCharCount("", "output-char-count");
    }
  };

  // Event Listeners
  sourceText.addEventListener("input", () => {
    updateCharCount(sourceText.value, "input-char-count");
    handleConversion();
  });

  formatSelect.addEventListener("change", handleConversion);
  directionSelect.addEventListener("change", handleConversion);

  swapBtn.addEventListener("click", () => {
    const currentResult = resultText.value;
    if (currentResult) {
      sourceText.value = currentResult;
      updateCharCount(currentResult, "input-char-count");

      // Swap direction
      directionSelect.value = directionSelect.value === "encode"
        ? "decode"
        : "encode";

      handleConversion();
      showToast("Input/Output swapped", "success");
    } else {
      showToast("Nothing to swap!", "error");
    }
  });

  clearBtn.addEventListener("click", () => {
    sourceText.value = "";
    resultText.value = "";
    updateCharCount("", "input-char-count");
    updateCharCount("", "output-char-count");
    errorMessage.classList.add("hidden");
    showToast("All cleared");
  });

  copyBtn.addEventListener("click", () => {
    copyToClipboard(resultText.value);
  });

  downloadBtn.addEventListener("click", () => {
    const filename =
      `enkoda-${formatSelect.value}-${directionSelect.value}.txt`;
    downloadText(resultText.value, filename);
  });

  // Native Base64 with UTF-8 support
  function encodeBase64(str) {
    // UTF-8 support: btoa() only handles ASCII. We use encodeURIComponent to escape non-ASCII,
    // then unescape them into a sequence of bytes that btoa can handle.
    return btoa(unescape(encodeURIComponent(str)));
  }

  function decodeBase64(str) {
    // UTF-8 support: reverse of encodeBase64
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (_e) {
      throw new Error("Invalid Base64 input");
    }
  }

  // Base32 Implementation (RFC 4648)
  const B32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  function encodeBase32(str) {
    // Convert string to bytes (UTF-8)
    const encoder = new TextEncoder();
    const data = encoder.encode(str);

    let bits = 0;
    let value = 0;
    let output = "";

    for (let i = 0; i < data.length; i++) {
      value = (value << 8) | data[i];
      bits += 8;

      while (bits >= 5) {
        output += B32_ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      output += B32_ALPHABET[(value << (5 - bits)) & 31];
    }

    // Padding
    while (output.length % 8 !== 0) {
      output += "=";
    }

    return output;
  }

  function decodeBase32(str) {
    str = str.replace(/=+$/, "").toUpperCase();
    if (!/^[A-Z2-7]*$/.test(str)) {
      throw new Error("Invalid Base32 input");
    }

    const bytes = [];
    let bits = 0;
    let value = 0;

    for (let i = 0; i < str.length; i++) {
      value = (value << 5) | B32_ALPHABET.indexOf(str[i]);
      bits += 5;

      if (bits >= 8) {
        bytes.push((value >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }

    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
  }
});
