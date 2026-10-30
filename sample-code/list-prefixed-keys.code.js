const Directory = () => {
  const users = vanX.reactive({k20: "Bob"})

  return div(
    vanX.list(ul, users, name => li(name)),
    button({onclick: () => vanX.replace(users, {k10: "Alice", k20: "Bob"})}, "Refresh"),
  )
}
