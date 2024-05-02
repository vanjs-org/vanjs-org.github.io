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
