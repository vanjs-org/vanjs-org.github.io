const {div, li, p, ul} = van.tags

const EvenNumbers = ({N}) => div(
  p("List of even numbers in 1.." + N + ":"),
  ul(
    Array.from({length: N}, (_, i) => i + 1)
      .filter(i => i % 2 === 0)
      .map(i => li(i)),
  ),
)

van.add(document.body, EvenNumbers({N: 20}))
