const busy = van.state(false)
van.add(document.body, button({disabled: busy}, "Save"))

busy.val = true
van.add(document.body, button({disabled: busy}, "Retry"))
busy.val = false
