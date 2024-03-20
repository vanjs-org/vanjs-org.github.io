const {input, li, option, select, span, ul} = van.tags

const SortedList = () => {
  const items = van.state("a,b,c"), sortedBy = van.state("Ascending")
  return span(
    "Comma-separated list: ",
    input({oninput: e => items.val = e.target.value,
      type: "text", value: items}), " ",
    select({oninput: e => sortedBy.val = e.target.value, value: sortedBy},
      option({value: "Ascending"}, "Ascending"),
      option({value: "Descending"}, "Descending"),
    ),
    // A State-derived child node
    () => sortedBy.val === "Ascending" ?
      ul(items.val.split(",").sort().map(i => li(i))) :
      ul(items.val.split(",").sort().reverse().map(i => li(i))),
  )
}

van.add(document.body, SortedList())
