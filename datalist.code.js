const Datalist = () => div(
  label({for: "ice-cream-choice"}, "Choose a flavor: "),
  input({
    list: "ice-cream-flavors",
    id: "ice-cream-choice",
    name: "ice-cream-choice",
  }),
  datalist(
    {id: "ice-cream-flavors"},
    option({value: "Chocolate"}),
    option({value: "Coconut"}),
    option({value: "Mint"}),
    option({value: "Strawberry"}),
    option({value: "Vanilla"}),
  )
)
