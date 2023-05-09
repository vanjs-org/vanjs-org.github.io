const {button, div} = van.tags

const Calculator = () => {
  const displayNum = van.state(0)
  let lhs = null, op = null, rhs = 0

  const calc = (lhs, op, rhs) => {
    const rhsNumber = parseFloat(rhs)
    if (!op || lhs === null) return rhsNumber
    if (op === "+") return lhs + rhsNumber
    if (op === "-") return lhs - rhsNumber
    if (op === "x") return lhs * rhsNumber
    if (op === "÷") return lhs / rhsNumber
  }

  const onclick = e => {
    const str = e.target.innerText
    if (str >= "0" && str <= "9") {
      if (rhs) {
        if (typeof rhs === "string") rhs += str; else rhs = rhs * 10 + parseInt(str)
      } else
        rhs = parseInt(str)
    } else if (str === "AC") {
      lhs = op = null, rhs = 0
    } else if (str === "+/-") {
      if (rhs) rhs = -rhs
    } else if (str === "%") {
      if (rhs) rhs *= 0.01
    } else if (str === "+" || str === "-" || str === "x" || str === "÷") {
      if (rhs !== null) lhs = calc(lhs, op, rhs), rhs = null
      op = str
    } else if (str === "=") {
      if (op && rhs !== null) lhs = calc(lhs, op, rhs), op = null, rhs = null
    } else if (str === ".") {
      rhs = rhs ? rhs + "." : "0."
    }

    displayNum.val = rhs ?? lhs
  }

  const Button = str => div({class: "button"}, button(str))

  return div({id: "root"},
    div({id: "display"}, div(displayNum)),
    div({id: "panel", onclick},
      div(Button("AC"), Button("+/-"), Button("%"), Button("÷")),
      div(Button("7"), Button("8"), Button("9"), Button("x")),
      div(Button("4"), Button("5"), Button("6"), Button("-")),
      div(Button("1"), Button("2"), Button("3"), Button("+")),
      div(div({class: "button wide"}, button("0")), Button("."), Button("=")),
    ),
  )
}

van.add(document.body, Calculator())
