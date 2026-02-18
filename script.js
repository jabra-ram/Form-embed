(function () {
  "use strict";

  // Get API key from script tag data attribute
  const scriptTag = document.currentScript;
  const token = scriptTag?.getAttribute("data-token") || "";
  const theme = scriptTag?.getAttribute("data-theme") || "light";
  const settingsId = scriptTag?.getAttribute("data-settings-id");

  // Configuration
  const CONFIG = {
    apiEndpoint: `https://staging.kawach.ai/api/dsar_case/${settingsId}`,
    containerId: "dsar-form-container",
  };

  // CSS Styles
  const styles = `
    .embeddable-form-wrapper {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 700px;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .embeddable-form-wrapper * {
      box-sizing: border-box;
    }

    .embeddable-form {
      background: ${theme === "dark" ? "#1e1e1e" : "#ffffff"};
      border-radius: 8px;
      padding: 15px 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .form-header {
      text-align: center;
      margin-bottom: 10px;
    }

    .form-section-title {
      font-size: 18px;
      font-weight: 600;
      color: ${theme === "dark" ? "#fff" : "#1a1a1a"};
      margin: 0 0 10px 0;
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
      font-size: 12px;
      font-weight: 400;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid ${theme === "dark" ? "#444" : "#d1d5db"};
      border-radius: 6px;
      font-size: 12px;
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
      font-size: 11px;
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
      padding: 12px;
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
      font-size: 12px;
      margin-bottom: 4px;
    }

    .radio-description {
      font-size: 11px;
      color: ${theme === "dark" ? "#aaa" : "#6b7280"};
      line-height: 1.4;
    }

    .form-button {
      width: 100%;
      padding: 12px;
      background: ${theme === "dark" ? "#0092b8" : "#155265"};
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 10px;
    }

    .form-button:hover {
      background: ${theme === "dark" ? "#007595" : "#005f78"};
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

    .success-title,
    .error-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .form-message p {
      margin: 6px 0;
    }

    @media (max-width: 640px) {
      .embeddable-form {
        padding: 30px 20px;
      }
    }
  `;

  const formHTML = `
    <div class="embeddable-form-wrapper">
      <div class="embeddable-form">
        <div class="form-header">
          <h2>Data Subject Access Request (DSAR) Submission</h2>
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
                <div class="radio-title">Data Access</div>
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
                <div class="radio-title">Data Erasure</div>
                <div class="radio-description">Request that we erase the personal data we hold about you.</div>
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

          <h2 class="form-section-title" style="margin-top: 20px;">Specific Details <span id="details-required" style="display:none;"> (Required)</span> </h2>

          <div class="form-group">
            <label class="form-label" for="ef-details">Please provide details about your request</label>
            <textarea
              id="ef-details"
              name="details"
              class="form-textarea"
              placeholder="Explain your request clearly. E.g., I would like to correct the date of birth associated with my account."
            ></textarea>
            <p class="form-helper">The more detail you provide, the faster we can process your request.</p>
          </div>

          <button type="submit" class="form-button">Submit Request</button>

          <p class="form-footer">Final fulfillment is subject to mandatory <span style="font-weight: bold;">identity verification</span> and legal review.</p>

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
      console.warn("DSAR container not found");
      return;
    }

    // Inject HTML
    container.innerHTML = formHTML;

    // Attach form handler
    const form = document.getElementById("dsar-form-container");
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
          toggleDetailsRequirement(this.value);
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
      requester_name: formData.get("fullName"),
      contact_email: formData.get("email"),
      type: formData.get("requestType"),
      additional_info: formData.get("details"),
    };

    if (data.type === "correction" && data.additional_info.trim() === "") {
      showMessage(
        "Providing details is mandatory for data correction requests.",
        "error",
      );
      return;
    }

    if (!token) {
      showMessage("Missing token", "error");
      return;
    }

    // Disable button
    button.disabled = true;
    button.textContent = "Submitting Request...";
    messageDiv.style.display = "none";

    try {
      const response = await fetch(CONFIG.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Widget-Token": token,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("result:  ", result);

      if (response.ok) {
        showMessage("", "success", data.contact_email);

        const radioOptions = document.querySelectorAll(".radio-option");
        radioOptions.forEach((opt) => opt.classList.remove("selected"));
      } else {
        showMessage(result.message || "Something went wrong.", "error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showMessage(
        "Sorry, there was an error submitting your request. Please try again later or contact us directly.",
        "error",
      );
    } finally {
      button.disabled = false;
      button.textContent = "Submit Request";
    }
  }

  function toggleDetailsRequirement(type) {
    const textarea = document.getElementById("ef-details");
    const requiredLabel = document.getElementById("details-required");

    if (type === "correction") {
      textarea.setAttribute("required", "required");
      requiredLabel.style.display = "inline";
    } else {
      textarea.removeAttribute("required");
      requiredLabel.style.display = "none";
    }
  }

  // Show success/error message
  function showMessage(text, type, email = "") {
    const messageDiv = document.getElementById("form-message");

    messageDiv.className = `form-message ${type}`;

    if (type === "success") {
      messageDiv.innerHTML = `
      <div class="success-title">Request Received</div>
      <p>
        Thank you for submitting your request. We have successfully logged your case.
      </p>
      <p>
        Your <strong>Request ID</strong> will be sent to
        <em>${email}</em> shortly. Please note that
        <strong>all further communication</strong> regarding your request
        will be sent to this email.
      </p>
    `;
    } else {
      messageDiv.innerHTML = `<p>${text}</p>`;
    }

    messageDiv.style.display = "block";
    messageDiv.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 20000);
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
