const {a, b, button, div, pre, span, textarea} = van.tags

const ListItem = ({key, value, indent = 0}) => {
  const hide = van.state(key !== "")
  const style = {deps: [hide], f: hide => hide ? "display: none" : ""}
  let valueDom
  if (typeof value !== "object") valueDom = value
  else valueDom = div({style},
    Object.entries(value).map(([k, v]) =>
      ListItem({key: k, value: v, indent: indent + 2 * (key !== "")})),
  )
  return (key ? div : pre)(
    " ".repeat(indent),
    key ? (
      typeof valueDom !== "object" ? ["🟰 ", b(`${key}: `)] :
        a({onclick: () => hide.val = !hide.val, style: "cursor: pointer"},
          van.bind(hide, hide => hide ? "➕ " : "➖ "),
          b(`${key}: `),
          van.bind(hide, hide => hide ? "…" : ""),
        )
    ) : [],
    valueDom,
  )
}

const JsonInspector = ({initInput}) => {
  const textareaDom = textarea({rows: 5, cols: 80}, initInput)
  const errmsg = van.state(""), json = van.state(null)

  const inspect = () => {
    try {
      json.val = JSON.parse(textareaDom.value)
      errmsg.val = ""
    } catch (e) {
      errmsg.val = e.message
    }
  }

  return div(
    div(textareaDom),
    div(button({onclick: inspect}, "Inspect")),
    pre({style: "color: red"}, errmsg),
    van.bind(json, json => json ? ListItem({key: "", value: json}) : ""),
  )
}

van.add(document.body, JsonInspector({initInput: `{"name":"John Doe","age":30,"email":"johndoe@example.com","address":{"street":"123 Main St","city":"Anytown","state":"CA","zip":"12345"},"phone_numbers":[{"type":"home","number":"555-1234"},{"type":"work","number":"555-5678"}]}`}))