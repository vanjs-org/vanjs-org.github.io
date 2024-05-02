const TurnBold = () => {
  const vanJS = van.state("VanJS")
  return span(
    button({onclick: () => vanJS.val = b("VanJS")}, "Turn Bold"),
    " Welcome to ", vanJS, ". ", vanJS, " is awesome!"
  )
}
