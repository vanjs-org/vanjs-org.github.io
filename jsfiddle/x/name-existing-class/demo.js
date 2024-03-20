const {button, div, input} = van.tags

class Person {
  constructor(firstName, lastName) { this.firstName = firstName; this.lastName = lastName }
  get fullName() { return `${this.firstName} ${this.lastName}` }
}

const Name = () => {
  const person = vanX.reactive(new Person("Tao", "Xin"))
  return div(
    "First name: ",
    input({type: "text", value: () => person.firstName,
      oninput: e => person.firstName = e.target.value}), " ",
    "Last name: ",
    input({type: "text", value: () => person.lastName,
      oninput: e => person.lastName = e.target.value}), " ",
    "Full name: ", () => person.fullName, " ",
    button({onclick: () => (person.firstName = "Tao", person.lastName = "Xin")}, "Reset"),
  )
}

van.add(document.body, Name())
