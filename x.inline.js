{
  const {button, div, input} = van.tags

  const Name = () => {
    const data = vanX.reactive({name: {first: "Tao", last: "Xin"}})
    return div(
      "First name: ",
      input({type: "text", value: () => data.name.first,
        oninput: e => data.name.first = e.target.value}), " ",
      "Last name: ",
      input({type: "text", value: () => data.name.last,
        oninput: e => data.name.last = e.target.value}), " ",
      "Full name: ", () => `${data.name.first} ${data.name.last}`, " ",
      button({onclick: () => data.name = {first: "Tao", last: "Xin"}}, "Reset"),
    )
  }

  van.add(document.getElementById("demo-name"), Name())
}

{
  const {button, div, input} = van.tags

  const Name = () => {
    const data = vanX.reactive({name: {first: "Tao", last: "Xin"}})
    data.fullName = vanX.calc(() => `${data.name.first} ${data.name.last}`)
    return div(
      "First name: ",
      input({type: "text", value: () => data.name.first,
        oninput: e => data.name.first = e.target.value}), " ",
      "Last name: ",
      input({type: "text", value: () => data.name.last,
        oninput: e => data.name.last = e.target.value}), " ",
      "Full name: ", () => data.fullName, " ",
      button({onclick: () => data.name = {first: "Tao", last: "Xin"}}, "Reset"),
    )
  }

  van.add(document.getElementById("demo-name-calc"), Name())
}

{
  const {button, div, input} = van.tags

  const Name = () => {
    const data = vanX.reactive({name: {first: "Tao", last: "Xin"}})
    data.fullName = vanX.calc(() => `${data.name.first} ${data.name.last}`)
    return div(
      "First name: ",
      input({type: "text", value: () => data.name.first,
        oninput: e => data.name.first = e.target.value}), " ",
      "Last name: ",
      input({type: "text", value: () => data.name.last,
        oninput: e => data.name.last = e.target.value}), " ",
      "Full name: ", vanX.stateFields(data).fullName, " ",
      button({onclick: () => data.name = {first: "Tao", last: "Xin"}}, "Reset"),
    )
  }

  van.add(document.getElementById("demo-name-state-fields"), Name())
}

{
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
        oninput: e => person.firstName = e.target.value}), " ",
      "Last name: ",
      input({type: "text", value: () => person.lastName,
        oninput: e => person.lastName = e.target.value}), " ",
      "Full name: ", () => person.fullName, " ",
      button({onclick: () => (person.firstName = "Tao", person.lastName = "Xin")}, "Reset"),
    )
  }

  van.add(document.getElementById("demo-name-existing-class"), Name())
}