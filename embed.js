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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
    }

    .embeddable-form-wrapper * {
      box-sizing: border-box;
    }

    .embeddable-form {
      background: ${theme === "dark" ? "#1e1e1e" : "#ffffff"};
      border: 1px solid ${theme === "dark" ? "#333" : "#e0e0e0"};
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .embeddable-form h2 {
      margin: 0 0 20px 0;
      color: ${theme === "dark" ? "#fff" : "#333"};
      font-size: 24px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      margin-bottom: 6px;
      color: ${theme === "dark" ? "#ddd" : "#555"};
      font-size: 14px;
      font-weight: 500;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid ${theme === "dark" ? "#444" : "#ddd"};
      border-radius: 4px;
      font-size: 14px;
      background: ${theme === "dark" ? "#2a2a2a" : "#fff"};
      color: ${theme === "dark" ? "#fff" : "#333"};
      transition: border-color 0.2s;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #4A90E2;
    }

    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }

    .form-button {
      width: 100%;
      padding: 12px;
      background: #4A90E2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .form-button:hover {
      background: #357ABD;
    }

    .form-button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .form-message {
      margin-top: 15px;
      padding: 12px;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
    }

    .form-message.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .form-message.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  `;

  // HTML Template
  const formHTML = `
    <div class="embeddable-form-wrapper">
      <div class="embeddable-form">
        <h2>Contact Us</h2>
        <form id="embeddable-form-element">
          <div class="form-group">
            <label class="form-label" for="ef-name">Name *</label>
            <input
              type="text"
              id="ef-name"
              name="name"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="ef-email">Email *</label>
            <input
              type="email"
              id="ef-email"
              name="email"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="ef-message">Message *</label>
            <textarea
              id="ef-message"
              name="message"
              class="form-textarea"
              required
            ></textarea>
          </div>

          <button type="submit" class="form-button">Send Message</button>
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
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      submittedFrom: window.location.href,
      timestamp: new Date().toISOString(),
    };

    // Disable button
    button.disabled = true;
    button.textContent = "Sending...";
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
          "Thank you! Your message has been sent successfully.",
          "success"
        );
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showMessage(
        "Sorry, there was an error. Please try again later.",
        "error"
      );
    } finally {
      button.disabled = false;
      button.textContent = "Send Message";
    }
  }

  // Show message
  function showMessage(text, type) {
    const messageDiv = document.getElementById("form-message");
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = "block";

    if (type === "success") {
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 5000);
    }
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
