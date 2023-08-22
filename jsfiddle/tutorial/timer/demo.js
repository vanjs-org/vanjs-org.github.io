const {button, span} = van.tags

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Timer = ({totalSecs}) => {
  const secs = van.state(totalSecs)
  return span(
    secs, "s ",
    button({onclick: async () => {
      while (secs.val > 0) await sleep(1000), --secs.val
      await sleep(10) // Wait briefly for DOM update
      alert("⏰: Time is up")
      secs.val = totalSecs
    }}, "Start"),
  )
}

van.add(document.body, Timer({totalSecs: 5}))
