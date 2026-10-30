const Directory = () => {
  const users = vanX.reactive({20: "Bob"})

  return div(
    vanX.list(ul, users, name => li(name)),
    button({onclick: () => vanX.replace(users, {10: "Alice", 20: "Bob"})}, "Refresh"),
  )
}
