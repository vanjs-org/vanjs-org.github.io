const tsToDate = ts =>
  ts < 1e10 ? new Date(ts * 1e3) :
  ts < 1e13 ? new Date(ts) :
  ts < 1e16 ? new Date(ts / 1e3) :
  new Date(ts / 1e6)

const Converter = () => {
  const nowTs = van.state(Math.floor(new Date().getTime() / 1e3))
  setInterval(() => ++nowTs.val, 1000)
  const inputDom = input({type: "text", size: 25, value: nowTs.val})
  let dateStrDom
  const resultDom = div(
    div(b("Now: "), nowTs),
    inputDom, " ",
    button({
      onclick: () => {
        const date = tsToDate(Number(inputDom.value))
        dateStrDom?.remove()
        dateStrDom = resultDom.appendChild(p(
          div(date.toString()),
          div(b("GMT: "), date.toGMTString()),
        ))
      },
    }, "Convert"),
    p(i("Supports Unix timestamps in seconds, milliseconds, microseconds and nanoseconds.")),
  )
  return resultDom
}
