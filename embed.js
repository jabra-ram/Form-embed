(function () {
  "use strict";

  // Configuration
  const CONFIG = {
    apiEndpoint: "https://yourapi.com/api/submissions",
    containerId: "embeddable-form-container",
  };

  // Get API key from script tag data attribute
  const scriptTag = document.currentScript;
  const apiKey = scriptTag?.getAttribute("data-api-key") || "";
  const theme = scriptTag?.getAttribute("data-theme") || "light";

  // CSS Styles
  const styles = `
    .embeddable-form-wrapper {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 650px;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
    }

    .embeddable-form-wrapper * {
      box-sizing: border-box;
    }

    .embeddable-form {
      background: ${theme === "dark" ? "#1e1e1e" : "#ffffff"};
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }

    .form-header {
      text-align: center;
      margin-bottom: 10px;
    }

    .form-icon {
      width: 32px;
      height: 32px;
      margin-bottom: 10px;
    }

    .embeddable-form h1 {
      margin: 0 0 8px 0;
      color: ${theme === "dark" ? "#fff" : "#1a1a1a"};
      font-size: 28px;
      font-weight: 600;
    }

    .form-subtitle {
      color: ${theme === "dark" ? "#aaa" : "#666"};
      font-size: 15px;
      margin: 0 0 30px 0;
      line-height: 1.5;
    }

    .form-section-title {
      font-size: 18px;
      font-weight: 600;
      color: ${theme === "dark" ? "#fff" : "#1a1a1a"};
      margin: 0 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      margin-bottom: 8px;
      color: ${theme === "dark" ? "#ddd" : "#333"};
      font-size: 14px;
      font-weight: 500;
    }

    .form-input,
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
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
      color: ${theme === "dark" ? "#666" : "#9ca3af"};
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: ${theme === "dark" ? "#0d7490" : "#0891b2"};
      box-shadow: 0 0 0 3px ${
        theme === "dark" ? "rgba(13,116,144,0.1)" : "rgba(8,145,178,0.1)"
      };
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
      line-height: 1.5;
    }

    .form-helper {
      font-size: 13px;
      color: ${theme === "dark" ? "#888" : "#6b7280"};
      margin-top: 6px;
      line-height: 1.4;
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 12px;
    }

    .radio-option {
      display: flex;
      align-items: flex-start;
      padding: 16px;
      border: 1px solid ${theme === "dark" ? "#444" : "#e5e7eb"};
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      background: ${theme === "dark" ? "#2a2a2a" : "#ffffff"};
    }

    .radio-option:hover {
      border-color: ${theme === "dark" ? "#0d7490" : "#0891b2"};
      background: ${theme === "dark" ? "#333" : "#f9fafb"};
    }

    .radio-option.selected {
      border-color: ${theme === "dark" ? "#0d7490" : "#0891b2"};
      background: ${
        theme === "dark" ? "rgba(13,116,144,0.1)" : "rgba(8,145,178,0.05)"
      };
    }

    .radio-option input[type="radio"] {
      margin: 2px 12px 0 0;
      width: 18px;
      height: 18px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .radio-content {
      flex: 1;
    }

    .radio-title {
      font-weight: 500;
      color: ${theme === "dark" ? "#fff" : "#1a1a1a"};
      font-size: 15px;
      margin-bottom: 4px;
    }

    .radio-description {
      font-size: 13px;
      color: ${theme === "dark" ? "#aaa" : "#6b7280"};
      line-height: 1.4;
    }

    .form-button {
      width: 100%;
      padding: 14px;
      background: ${theme === "dark" ? "#0e7490" : "#0891b2"};
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 10px;
    }

    .form-button:hover {
      background: ${theme === "dark" ? "#0d7490" : "#0e7490"};
    }

    .form-button:disabled {
      background: ${theme === "dark" ? "#444" : "#d1d5db"};
      cursor: not-allowed;
    }

    .form-footer {
      text-align: center;
      font-size: 13px;
      color: ${theme === "dark" ? "#888" : "#6b7280"};
      margin-top: 16px;
      line-height: 1.5;
    }

    .form-message {
      margin-top: 20px;
      padding: 14px 16px;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
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
      .embeddable-form {
        padding: 30px 20px;
      }

      .embeddable-form h1 {
        font-size: 24px;
      }
    }
  `;

  // HTML Template
  const formHTML = `
    <div class="embeddable-form-wrapper">
      <div class="embeddable-form">
        <div class="form-header">
          <svg class="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #0891b2;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h1>Data Request Submission</h1>
          <p class="form-subtitle">Submit a Data Subject Access Request (DSAR) to our organization.</p>
        </div>

        <form id="embeddable-form-element">
          <h2 class="form-section-title">Your Contact Information</h2>

          <div class="form-group">
            <label class="form-label" for="ef-name">Full Name (Required)</label>
            <input
              type="text"
              id="ef-name"
              name="fullName"
              class="form-input"
              placeholder="Enter your full legal name"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="ef-email">Email Address (Required)</label>
            <input
              type="email"
              id="ef-email"
              name="email"
              class="form-input"
              placeholder="Enter your email address"
              required
            />
            <p class="form-helper">We will use this email for confirmation and identity verification.</p>
          </div>

          <h2 class="form-section-title">Type of Data Request (Required)</h2>

          <div class="radio-group">
            <label class="radio-option">
              <input
                type="radio"
                name="requestType"
                value="access"
                required
              />
              <div class="radio-content">
                <div class="radio-title">Data Access / Portability</div>
                <div class="radio-description">Request a copy of the personal data we hold about you.</div>
              </div>
            </label>

            <label class="radio-option">
              <input
                type="radio"
                name="requestType"
                value="deletion"
              />
              <div class="radio-content">
                <div class="radio-title">Data Deletion ("Right to be Forgotten")</div>
                <div class="radio-description">Request that we delete the personal data we hold about you.</div>
              </div>
            </label>

            <label class="radio-option">
              <input
                type="radio"
                name="requestType"
                value="correction"
              />
              <div class="radio-content">
                <div class="radio-title">Data Correction</div>
                <div class="radio-description">Request to update or correct inaccurate personal data.</div>
              </div>
            </label>
          </div>

          <h2 class="form-section-title" style="margin-top: 30px;">Specific Details</h2>

          <div class="form-group">
            <label class="form-label" for="ef-details">Please provide details about your request (Required)</label>
            <textarea
              id="ef-details"
              name="details"
              class="form-textarea"
              placeholder="Explain your request clearly. E.g., I would like to correct the date of birth associated with my account."
              required
            ></textarea>
            <p class="form-helper">The more detail you provide, the faster we can process your request.</p>
          </div>

          <button type="submit" class="form-button">Submit Request</button>

          <p class="form-footer">Final fulfillment is subject to mandatory **identity verification** and legal review.</p>

          <div id="form-message" class="form-message" style="display: none;"></div>
        </form>
      </div>
    </div>
  `;

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

    // Attach form handler
    const form = document.getElementById("embeddable-form-element");
    form.addEventListener("submit", handleSubmit);

    // Add radio button click handlers for visual feedback
    const radioOptions = container.querySelectorAll(".radio-option");
    radioOptions.forEach((option) => {
      option.addEventListener("click", function () {
        radioOptions.forEach((opt) => opt.classList.remove("selected"));
        if (this.querySelector('input[type="radio"]').checked) {
          this.classList.add("selected");
        }
      });

      const radioInput = option.querySelector('input[type="radio"]');
      radioInput.addEventListener("change", function () {
        radioOptions.forEach((opt) => opt.classList.remove("selected"));
        if (this.checked) {
          option.classList.add("selected");
        }
      });
    });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector(".form-button");
    const messageDiv = document.getElementById("form-message");

    // Get form data
    const formData = new FormData(form);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      requestType: formData.get("requestType"),
      details: formData.get("details"),
      submittedFrom: window.location.href,
      timestamp: new Date().toISOString(),
    };

    // Disable button
    button.disabled = true;
    button.textContent = "Submitting Request...";
    messageDiv.style.display = "none";

    try {
      const response = await fetch(CONFIG.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showMessage(
          "Thank you! Your data request has been submitted successfully. We will contact you shortly to verify your identity and process your request.",
          "success"
        );
        form.reset();

        // Remove selected state from radio buttons
        const radioOptions = document.querySelectorAll(".radio-option");
        radioOptions.forEach((opt) => opt.classList.remove("selected"));
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showMessage(
        "Sorry, there was an error submitting your request. Please try again later or contact us directly.",
        "error"
      );
    } finally {
      button.disabled = false;
      button.textContent = "Submit Request";
    }
  }

  // Show message
  function showMessage(text, type) {
    const messageDiv = document.getElementById("form-message");
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = "block";

    if (type === "success") {
      // Scroll to message
      messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 8000);
    }
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
