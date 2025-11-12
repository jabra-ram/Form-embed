(function () {
  "use strict";

  // Configuration
  const CONFIG = {
    apiEndpoint: "https://yourapi.com/api/appeals",
    containerId: "appeal-form-container",
  };

  // Get API key from script tag data attribute
  const scriptTag = document.currentScript;
  const apiKey = scriptTag?.getAttribute("data-api-key") || "";
  const theme = scriptTag?.getAttribute("data-theme") || "light";
  const caseId = scriptTag?.getAttribute("data-case-id") || "";
  const rejectionReason =
    scriptTag?.getAttribute("data-rejection-reason") || "";

  // CSS Styles
  const styles = `
    .appeal-form-wrapper {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
    }

    .appeal-form-wrapper * {
      box-sizing: border-box;
    }

    .appeal-form {
      background: ${theme === "dark" ? "#1e1e1e" : "#ffffff"};
      border-radius: 8px;
      padding: 35px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .appeal-form h1 {
      margin: 0 0 8px 0;
      color: ${theme === "dark" ? "#fff" : "#1a1a1a"};
      font-size: 24px;
      font-weight: 600;
    }

    .form-subtitle {
      color: ${theme === "dark" ? "#aaa" : "#6b7280"};
      font-size: 14px;
      margin: 0 0 30px 0;
      line-height: 1.5;
    }

    .info-box {
      background: ${theme === "dark" ? "#2d1f1f" : "#fef2f2"};
      border: 1px solid ${theme === "dark" ? "#5c2626" : "#fecaca"};
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 20px;
    }

    .info-label {
      font-size: 12px;
      font-weight: 600;
      color: ${theme === "dark" ? "#fca5a5" : "#991b1b"};
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-value {
      font-size: 15px;
      font-weight: 600;
      color: ${theme === "dark" ? "#fff" : "#1a1a1a"};
      margin-bottom: 12px;
    }

    .info-value:last-child {
      margin-bottom: 0;
    }

    .info-note {
      font-size: 13px;
      color: ${theme === "dark" ? "#fca5a5" : "#dc2626"};
      margin-top: 8px;
      line-height: 1.4;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      margin-bottom: 8px;
      color: ${theme === "dark" ? "#ddd" : "#1a1a1a"};
      font-size: 14px;
      font-weight: 500;
    }

    .required {
      color: #dc2626;
      margin-left: 2px;
    }

    .form-textarea {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid ${theme === "dark" ? "#444" : "#d1d5db"};
      border-radius: 6px;
      font-size: 14px;
      background: ${theme === "dark" ? "#2a2a2a" : "#ffffff"};
      color: ${theme === "dark" ? "#fff" : "#1a1a1a"};
      transition: all 0.2s;
      font-family: inherit;
      resize: vertical;
      min-height: 120px;
      line-height: 1.5;
    }

    .form-textarea::placeholder {
      color: ${theme === "dark" ? "#666" : "#9ca3af"};
    }

    .form-textarea:focus {
      outline: none;
      border-color: ${theme === "dark" ? "#dc2626" : "#dc2626"};
      box-shadow: 0 0 0 3px ${
        theme === "dark" ? "rgba(220,38,38,0.1)" : "rgba(220,38,38,0.1)"
      };
    }

    .char-counter {
      text-align: right;
      font-size: 12px;
      color: ${theme === "dark" ? "#888" : "#6b7280"};
      margin-top: 6px;
    }

    .char-counter.warning {
      color: #f59e0b;
    }

    .char-counter.error {
      color: #dc2626;
    }

    .file-upload-wrapper {
      margin-bottom: 20px;
    }

    .file-input-label {
      display: inline-block;
      padding: 10px 16px;
      background: ${theme === "dark" ? "#2a2a2a" : "#ffffff"};
      border: 1px solid ${theme === "dark" ? "#444" : "#d1d5db"};
      border-radius: 6px;
      color: ${theme === "dark" ? "#ddd" : "#374151"};
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .file-input-label:hover {
      background: ${theme === "dark" ? "#333" : "#f9fafb"};
      border-color: ${theme === "dark" ? "#555" : "#9ca3af"};
    }

    .file-input-hidden {
      display: none;
    }

    .file-name {
      font-size: 13px;
      color: ${theme === "dark" ? "#aaa" : "#6b7280"};
      margin-top: 8px;
    }

    .file-helper {
      font-size: 12px;
      color: ${theme === "dark" ? "#888" : "#6b7280"};
      margin-top: 6px;
      line-height: 1.4;
    }

    .selected-files {
      margin-top: 12px;
    }

    .file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      background: ${theme === "dark" ? "#2a2a2a" : "#f9fafb"};
      border: 1px solid ${theme === "dark" ? "#444" : "#e5e7eb"};
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 13px;
    }

    .file-item-name {
      color: ${theme === "dark" ? "#ddd" : "#374151"};
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-item-size {
      color: ${theme === "dark" ? "#888" : "#9ca3af"};
      margin: 0 12px;
      font-size: 12px;
    }

    .file-remove {
      background: none;
      border: none;
      color: #dc2626;
      cursor: pointer;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .file-remove:hover {
      background: ${
        theme === "dark" ? "rgba(220,38,38,0.1)" : "rgba(220,38,38,0.1)"
      };
    }

    .submit-button {
      width: 100%;
      padding: 14px;
      background: #dc2626;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 10px;
    }

    .submit-button:hover {
      background: #b91c1c;
    }

    .submit-button:disabled {
      background: ${theme === "dark" ? "#444" : "#d1d5db"};
      cursor: not-allowed;
    }

    .form-message {
      margin-top: 20px;
      padding: 14px 16px;
      border-radius: 6px;
      font-size: 14px;
      line-height: 1.5;
    }

    .form-message.success {
      background: ${theme === "dark" ? "#064e3b" : "#d1fae5"};
      color: ${theme === "dark" ? "#6ee7b7" : "#065f46"};
      border: 1px solid ${theme === "dark" ? "#065f46" : "#a7f3d0"};
    }

    .form-message.error {
      background: ${theme === "dark" ? "#7f1d1d" : "#fee2e2"};
      color: ${theme === "dark" ? "#fca5a5" : "#991b1b"};
      border: 1px solid ${theme === "dark" ? "#991b1b" : "#fecaca"};
    }

    @media (max-width: 640px) {
      .appeal-form {
        padding: 25px 20px;
      }

      .appeal-form h1 {
        font-size: 20px;
      }
    }
  `;

  // HTML Template
  const formHTML = `
    <div class="appeal-form-wrapper">
      <div class="appeal-form">
        <h1>Formal Appeal Submission</h1>
        <p class="form-subtitle">Use this form to contest the outcome of your Data Subject Access Request.</p>

        <div class="info-box">
          <div class="info-label">Case ID</div>
          <div class="info-value" id="case-id-display">${
            caseId || "DSAR-2024-987654"
          }</div>

          <div class="info-label" style="margin-top: 12px;">Request Rejection Reason</div>
          <div class="info-value" id="rejection-reason-display">${
            rejectionReason || "Legally Denied"
          }</div>

          <div class="info-note">Please reference the denial email for specific details.</div>
        </div>

        <form id="appeal-form-element">
          <div class="form-group">
            <label class="form-label" for="appeal-explanation">
              Detailed Explanation <span class="required">*</span>
            </label>
            <textarea
              id="appeal-explanation"
              name="explanation"
              class="form-textarea"
              placeholder="Provide a detailed explanation supporting your appeal. Reference any new information or legal context."
              maxlength="2000"
              required
            ></textarea>
            <div class="char-counter" id="char-counter">Maximum 2000 characters.</div>
          </div>

          <div class="file-upload-wrapper">
            <label class="form-label">Supporting Documents</label>
            <label for="file-upload" class="file-input-label">
              Choose Files
            </label>
            <input
              type="file"
              id="file-upload"
              class="file-input-hidden"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <div class="file-helper">Accepted formats: PDF, JPG, PNG. Max file size: 5MB.</div>
            <div id="selected-files" class="selected-files"></div>
          </div>

          <button type="submit" class="submit-button">Submit Formal Appeal</button>

          <div id="form-message" class="form-message" style="display: none;"></div>
        </form>
      </div>
    </div>
  `;

  let selectedFiles = [];

  // Initialize the form
  function init() {
    // Inject styles
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    // Find or create container
    let container = document.getElementById(CONFIG.containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = CONFIG.containerId;
      scriptTag.parentNode.insertBefore(container, scriptTag);
    }

    // Inject HTML
    container.innerHTML = formHTML;

    // Attach event handlers
    const form = document.getElementById("appeal-form-element");
    form.addEventListener("submit", handleSubmit);

    const textarea = document.getElementById("appeal-explanation");
    textarea.addEventListener("input", updateCharCounter);

    const fileInput = document.getElementById("file-upload");
    fileInput.addEventListener("change", handleFileSelect);
  }

  // Update character counter
  function updateCharCounter(e) {
    const textarea = e.target;
    const counter = document.getElementById("char-counter");
    const length = textarea.value.length;
    const max = 2000;

    counter.textContent = `${length} / ${max} characters`;

    counter.classList.remove("warning", "error");
    if (length > max * 0.9) {
      counter.classList.add("warning");
    }
    if (length >= max) {
      counter.classList.add("error");
    }
  }

  // Handle file selection
  function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    files.forEach((file) => {
      // Validate file size
      if (file.size > maxSize) {
        showMessage(
          `File "${file.name}" is too large. Maximum size is 5MB.`,
          "error"
        );
        return;
      }

      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        showMessage(
          `File "${file.name}" has an invalid format. Only PDF, JPG, and PNG are allowed.`,
          "error"
        );
        return;
      }

      // Add to selected files if not already added
      if (!selectedFiles.find((f) => f.name === file.name)) {
        selectedFiles.push(file);
      }
    });

    displaySelectedFiles();
    e.target.value = ""; // Reset input
  }

  // Display selected files
  function displaySelectedFiles() {
    const container = document.getElementById("selected-files");

    if (selectedFiles.length === 0) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = selectedFiles
      .map(
        (file, index) => `
      <div class="file-item">
        <span class="file-item-name">${file.name}</span>
        <span class="file-item-size">${formatFileSize(file.size)}</span>
        <button type="button" class="file-remove" data-index="${index}">Remove</button>
      </div>
    `
      )
      .join("");

    // Attach remove handlers
    container.querySelectorAll(".file-remove").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        selectedFiles.splice(index, 1);
        displaySelectedFiles();
      });
    });
  }

  // Format file size
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector(".submit-button");
    const messageDiv = document.getElementById("form-message");

    // Get form data
    const formData = new FormData();
    formData.append(
      "caseId",
      document.getElementById("case-id-display").textContent
    );
    formData.append(
      "rejectionReason",
      document.getElementById("rejection-reason-display").textContent
    );
    formData.append("explanation", form.explanation.value);
    formData.append("submittedFrom", window.location.href);
    formData.append("timestamp", new Date().toISOString());

    // Append files
    selectedFiles.forEach((file, index) => {
      formData.append(`document_${index}`, file);
    });

    // Disable button
    button.disabled = true;
    button.textContent = "Submitting Appeal...";
    messageDiv.style.display = "none";

    try {
      const response = await fetch(CONFIG.apiEndpoint, {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
        },
        body: formData,
      });

      if (response.ok) {
        showMessage(
          "Your appeal has been submitted successfully. We will review your case and contact you within 5-7 business days with our decision.",
          "success"
        );
        form.reset();
        selectedFiles = [];
        displaySelectedFiles();
        document.getElementById("char-counter").textContent =
          "Maximum 2000 characters.";
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Appeal submission error:", error);
      showMessage(
        "Sorry, there was an error submitting your appeal. Please try again later or contact us directly.",
        "error"
      );
    } finally {
      button.disabled = false;
      button.textContent = "Submit Formal Appeal";
    }
  }

  // Show message
  function showMessage(text, type) {
    const messageDiv = document.getElementById("form-message");
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = "block";

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

    if (type === "success") {
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 10000);
    }
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
