const {button} = van.tags

class MyButton extends HTMLButtonElement {
  connectedCallback() {
    this.addEventListener("click", () => alert("MyButton clicked!"))
  }
}
customElements.define("my-button", MyButton, {extends: "button"})

const CustomButton = () => button({is: "my-button"}, "Click me")

van.add(document.body, CustomButton())
