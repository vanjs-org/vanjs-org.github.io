const {input, option, select, span} = van.tags

const FontPreview = () => {
  const size = van.state(16), color = van.state("black")
  return span(
    "Size: ",
    input({type: "range", min: 10, max: 36, value: size,
      oninput: e => size.val = e.target.value}),
    " Color: ",
    select({oninput: e => color.val = e.target.value, value: color},
      ["black", "blue", "green", "red", "brown"]
        .map(c => option({value: c}, c)),
    ),
    span({style: {deps: [size, color], f: (size, color) =>
      `font-size: ${size}px; color: ${color};`}}, " Hello 🍦VanJS"),
  )
}

van.add(document.body, FontPreview())
