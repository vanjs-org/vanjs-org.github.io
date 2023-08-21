const Calculator = () => {
  let lhs = van.state(null), op = null, rhs = van.state(0)

  const calc = (lhs, op, rhs) =>
    !op || lhs === null ? rhs :
    op === "+" ? lhs + rhs :
    op === "-" ? lhs - rhs :
    op === "x" ? lhs * rhs : lhs / rhs

  const onclick = e => {
    const str = e.target.innerText
    if (str >= "0" && str <= "9")
      typeof rhs.val === "string" ? rhs.val += str : rhs.val = rhs.val * 10 + Number(str)
    else if (str === "AC") lhs.val = op = null, rhs.val = 0
    else if (str === "+/-" && rhs.val) rhs.val = -rhs.val
    else if (str === "%" && rhs.val) rhs.val *= 0.01
    else if (str === "+" || str === "-" || str === "x" || str === "÷") {
      if (rhs.val !== null) lhs.val = calc(lhs.val, op, Number(rhs.val)), rhs.val = null
      op = str
    } else if (str === "=" && op && rhs.val !== null)
      lhs.val = calc(lhs.val, op, Number(rhs.val)), op = null, rhs.val = null
    else if (str === ".")
      rhs.val = rhs.val ? rhs.val + "." : "0."
  }

  const Button = str => div({class: "button"}, button(str))

  return div({id: "root"},
    div({id: "display"}, div(() => rhs.val ?? lhs.val)),
    div({id: "panel", onclick},
      div(Button("AC"), Button("+/-"), Button("%"), Button("÷")),
      div(Button("7"), Button("8"), Button("9"), Button("x")),
      div(Button("4"), Button("5"), Button("6"), Button("-")),
      div(Button("1"), Button("2"), Button("3"), Button("+")),
      div(div({class: "button wide"}, button("0")), Button("."), Button("=")),
    ),
  )
}
