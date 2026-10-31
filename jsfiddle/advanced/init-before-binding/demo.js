const {button} = van.tags

const busy = van.state(false)
van.add(document.body,
  button({disabled: busy}, "Save"),
  button({disabled: busy}, "Retry"),
)
