const template = document.createElement("template")
template.innerHTML = `
  <style>
    #info-box {
      display: none;
    }
  </style>
  <button>Show</button>
  <p id="info-box"><slot></slot></p>
`

class InfoToggle extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._infoBox = this.shadowRoot.querySelector("#info-box")
    this._button = this.shadowRoot.querySelector("button")

    this._button.addEventListener("click", this._toggleInfo.bind(this))

    this._isVisible = true
  }

  connectedCallback() {
    if (this.getAttribute("is-visible") === "true") {
      this._isVisible = !this._isVisible
      this._button.textContent = "Hide"
      this._infoBox.style.display = "block"
    }
  }

  _toggleInfo() {
    this._infoBox.style.display = this._isVisible ? "block" : "none"
    this._button.textContent = this._isVisible ? "Hide" : "Show"
    this._isVisible = !this._isVisible
  }
}

customElements.define("df-info-toggle", InfoToggle)
