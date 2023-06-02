const {div, li, p, ul} = van.tags

const EvenNumbers = ({N}) => {
  const listDom = ul()
  for (let i = 1; i <= N; ++i)
    if (i % 2 === 0)
      van.add(listDom, li(i))

  return div(
    p("List of even numbers in 1.." + N + ":"),
    listDom,
  )
}
van.add(document.body, EvenNumbers({N: 20}))
