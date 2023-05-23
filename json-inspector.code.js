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
  const autoGrow = e => {
    e.style.height = "5px"
    e.style.height = (e.scrollHeight + 5) + "px"
  }
  const textareaDom = textarea({oninput: e => autoGrow(e.target)}, initInput)
  setTimeout(() => autoGrow(textareaDom), 10)
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
