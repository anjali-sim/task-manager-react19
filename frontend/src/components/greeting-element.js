class GreetingElement extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div style="font-weight: bold; font-size: 1.25rem; color: #2563eb;">
          👋 Welcome to the Task Manager App! - From Web Component
        </div>
      `;
    }
  }
  
  customElements.define('greeting-element', GreetingElement);
  