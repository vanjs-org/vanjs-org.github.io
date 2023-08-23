const {a, button, div, input, li, ul} = van.tags

const ListItem = ({text}) => {
  const deleted = van.state(false)
  return () => deleted.val ? null : li(
    text, a({onclick: () => deleted.val = true}, "❌"),
  )
}

const EditableList = () => {
  const listDom = ul()
  const textDom = input({type: "text"})
  return div(
    textDom, " ",
    button({onclick: () => van.add(listDom, ListItem({text: textDom.value}))}, "➕"),
    listDom,
  )
}

van.add(document.body, EditableList())
