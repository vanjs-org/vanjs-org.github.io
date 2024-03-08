const name = van.state("")

const Name1 = () => div(() => name.val.trim().length === 0 ?
  p("Please enter your name") :
  p("Hello ", b(name)),
)

const Name2 = () => {
  const isNameEmpty = van.derive(() => name.val.trim().length === 0)
  return div(() => isNameEmpty.val ?
    p("Please enter your name") :
    p("Hello ", b(name)),
  )
}
