const CheckboxCounter = () => {
  const checked = van.state(false), numChecked = van.state(0)
  van.derive(() => {
    if (checked.val) ++numChecked.val
  })

  return div(
    input({type: "checkbox", checked, onclick: e => checked.val = e.target.checked}),
    " Checked ", numChecked, " times. ",
    button({onclick: () => numChecked.val = 0}, "Reset"),
  )
}
