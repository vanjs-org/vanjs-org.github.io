const {button, div, li, p, ul} = van.tags

const Contacts = () => {
  const items = vanX.reactive(["Alice", "Bob"])

  return div(
    p("Second contact: ", () => items[1] ?? "None"),
    vanX.list(ul, items, name => li(name)),
    button({onclick: () => delete items[1]}, "Remove Bob"),
  )
}

van.add(document.body, Contacts())
