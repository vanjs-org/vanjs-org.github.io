{
  const {button, input, span} = van.tags

  const Name = () => {
    const data = vanX.reactive({name: {first: "Tao", last: "Xin"}})
    return span(
      "First name: ",
      input({type: "text", value: () => data.name.first,
        oninput: e => data.name.first = e.target.value}), " ",
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
  const {button, input, span} = van.tags

  const Name = () => {
    const data = vanX.reactive({name: {first: "Tao", last: "Xin"}})
    const derived = vanX.reactive({fullName: vanX.calc(() => `${data.name.first} ${data.name.last}`)})
    return span(
      "First name: ",
      input({type: "text", value: () => data.name.first,
        oninput: e => data.name.first = e.target.value}), " ",
      "Last name: ",
      input({type: "text", value: () => data.name.last,
        oninput: e => data.name.last = e.target.value}), " ",
      "Full name: ", () => derived.fullName, " ",
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
        oninput: e => data.name.first = e.target.value}), " ",
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
        oninput: e => person.firstName = e.target.value}), " ",
      "Last name: ",
      input({type: "text", value: () => person.lastName,
        oninput: e => person.lastName = e.target.value}), " ",
      "Full name: ", () => person.fullName, " ",
      button({onclick: () => (person.firstName = "Tao", person.lastName = "Xin")}, "Reset"),
    )
  }

  van.add(document.getElementById("demo-name-existing-class"), Name())
}

{
  const {button, div, li, p, ul} = van.tags

  const Contacts = () => {
    const items = vanX.reactive(["Alice", "Bob"])

    return div(
      p("Second contact: ", () => items[1] ?? "None"),
      vanX.list(ul, items, name => li(name)),
      button({onclick: () => delete items[1]}, "Remove Bob"),
    )
  }

  van.add(document.getElementById("demo-list-deleted-entry"), Contacts())
}

{
  const {button, div, li, ul} = van.tags

  const Directory = () => {
    const users = vanX.reactive({20: "Bob"})

    return div(
      vanX.list(ul, users, name => li(name)),
      button({onclick: () => vanX.replace(users, {10: "Alice", 20: "Bob"})}, "Refresh"),
    )
  }

  van.add(document.getElementById("demo-list-numeric-keys"), Directory())
}

{
  const {button, div, li, ul} = van.tags

  const Directory = () => {
    const users = vanX.reactive({k20: "Bob"})

    return div(
      vanX.list(ul, users, name => li(name)),
      button({onclick: () => vanX.replace(users, {k10: "Alice", k20: "Bob"})}, "Refresh"),
    )
  }

  van.add(document.getElementById("demo-list-prefixed-keys"), Directory())
}

{
  const {a, button, del, div, input, span} = van.tags

  const TodoList = () => {
    const items = vanX.reactive(JSON.parse(localStorage.getItem("appState") ?? "[]"))
    van.derive(() => localStorage.setItem("appState", JSON.stringify(vanX.compact(items))))
    const inputDom = input({type: "text"})
    return div(
      inputDom, button({onclick: () => items.push({text: inputDom.value, done: false})}, "Add"),
      vanX.list(div, items, ({val: v}, deleter) => div(
        input({type: "checkbox", checked: () => v.done, onclick: e => v.done = e.target.checked}),
        () => (v.done ? del : span)(v.text),
        a({onclick: deleter}, "❌"),
      )),
    )
  }

  van.add(document.getElementById("demo-todo-list"), TodoList())
}

{
  const {a, button, div, input, li, ul} = van.tags

  const List = () => {
    const items = vanX.reactive([])
    const inputDom = input({type: "text"})

    return div(
      div(inputDom, button({onclick: () => items.push(inputDom.value)}, "Add")),
      div(() => Object.keys(items).length, " item(s) in total"),
      vanX.list(ul, items, (v, deleter) => li(v, " ", a({onclick: deleter}, "❌"))),
      div(
        button({onclick: () => vanX.replace(items, l => l.toSorted())}, "A -> Z"),
        button({onclick: () => vanX.replace(items,
          l => l.toSorted((a, b) => b.localeCompare(a)))}, "Z -> A"),
        button({onclick: () => vanX.replace(items, l => l.map(v => v + "!"))}, 'Append "!"'),
      ),
    )
  }

  van.add(document.getElementById("demo-example-list1"), List())
}

{
  const {a, button, div, input} = van.tags

  const TodoList = () => {
    const items = vanX.reactive(JSON.parse(localStorage.getItem("items") ?? "{}"))
    van.derive(() => localStorage.setItem("items", JSON.stringify(vanX.compact(items))))

    const inputDom = input({type: "text"})
    let id = Math.max(0, ...Object.keys(items).map(v => Number(v.slice(1))))

    return div(
      div(inputDom, button(
        {onclick: () => items["k" + ++id] = {text: inputDom.value, done: false}}, "Add")),
      div(() => Object.keys(items).length, " item(s) in total"),
      vanX.list(div, items, ({val: v}, deleter) => div(
        input({type: "checkbox", checked: () => v.done,
          onclick: e => v.done = e.target.checked}), " ",
        input({
          type: "text", value: () => v.text,
          style: () => v.done ? "text-decoration: line-through;" : "",
          oninput: e => v.text = e.target.value,
        }), " ",
        a({onclick: deleter}, "❌"),
      )),
      div(
        button({onclick: () => vanX.replace(items, l => l.filter(([_, v]) => !v.done))},
          "Clear Completed"),
        button({onclick: () => vanX.replace(items, l =>
          l.toSorted(([_1, a], [_2, b]) => a.text.localeCompare(b.text)))}, "A -> Z"),
        button({onclick: () => vanX.replace(items, l =>
          l.toSorted(([_1, a], [_2, b]) => b.text.localeCompare(a.text)))}, "Z -> A"),
        button({onclick: () => vanX.replace(items, l =>
          l.flatMap(([k1, v1]) => [
            [k1, v1],
            ["k" + ++id, {text: v1.text + " - copy", done: v1.done}],
          ]))},
          "Duplicate List"),
        button({onclick: () => Object.values(items).forEach(v => v.text += "!")}, 'Append "!"'),
      ),
    )
  }

  van.add(document.getElementById("demo-example-list2"), TodoList())
}

{
  const {a, button, del, div, input, span} = van.tags

  const TodoListPlus = () => {
    const appState = vanX.reactive(JSON.parse(
      localStorage.getItem("appStatePlus") ?? '{"input":"","items":[]}'))
    van.derive(() => localStorage.setItem("appStatePlus", JSON.stringify(vanX.compact(appState))))
    return div(
      input({type: "text", value: () => appState.input, oninput: e => appState.input = e.target.value}),
      button({onclick: () => appState.items.push({text: appState.input, done: false})}, "Add"),
      vanX.list(div, appState.items, ({val: v}, deleter) => div(
        input({type: "checkbox", checked: () => v.done, onclick: e => v.done = e.target.checked}),
        () => (v.done ? del : span)(v.text),
        a({onclick: deleter}, "❌"),
      )),
    )
  }

  van.add(document.getElementById("demo-todo-list-plus"), TodoListPlus())
}
