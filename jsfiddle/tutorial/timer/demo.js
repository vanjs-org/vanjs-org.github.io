const {button, span} = van.tags

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Timer = ({totalSecs}) => {
  const secs = van.state(totalSecs);
  return span(
    secs, "s ",
    button({onclick: async () => {
      while (secs.val > 0) await sleep(1000), --secs.val
      setTimeout(() => {
        alert("⏰: Time is up")
        secs.val = totalSecs
      }, 10)
    }}, "Start"),
  )
}

van.add(document.body, Timer({totalSecs: 5}))
