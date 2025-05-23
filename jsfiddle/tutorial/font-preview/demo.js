const {input, option, select, span} = van.tags

const FontPreview = () => {
  const size = van.state(16), color = van.state("blue")
  return span(
    "Size: ",
    input({type: "range", min: 10, max: 36, value: size,
      oninput: e => size.val = e.target.value}),
    " Color: ",
    select({oninput: e => color.val = e.target.value},
      ["blue", "green", "red", "brown"].map(c => option({selected: () => color.val === c}, c)),
    ),
    // The <span> element below has a state-derived property `style`
    span({style: () => `font-size: ${size.val}px; color: ${color.val};`}, " Hello 🍦VanJS"),
  )
}

van.add(document.body, FontPreview())
