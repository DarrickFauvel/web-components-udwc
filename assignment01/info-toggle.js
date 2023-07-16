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
  #infoBox
  #button
  #isVisible

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.#infoBox = this.shadowRoot.querySelector("#info-box")
    this.#button = this.shadowRoot.querySelector("button")

    this.#button.addEventListener("click", this._toggleInfo.bind(this))

    this.#isVisible = false
  }

  connectedCallback() {
    if (this.getAttribute("is-visible") === "true") {
      this.#isVisible = !this.#isVisible
      this.#button.textContent = "Hide"
      this.#infoBox.style.display = "block"
    }
  }

  _toggleInfo() {
    this.#infoBox.style.display = this.#isVisible ? "none" : "block"
    this.#button.textContent = this.#isVisible ? "Show" : "Hide"
    this.#isVisible = !this.#isVisible
  }
}

customElements.define("df-info-toggle", InfoToggle)
