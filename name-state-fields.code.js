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
