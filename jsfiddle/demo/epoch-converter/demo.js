const {b, button, div, i, input, p} = van.tags

const tsToDate = ts =>
  ts < 1e10 ? new Date(ts * 1e3) :
  ts < 1e13 ? new Date(ts) :
  ts < 1e16 ? new Date(ts / 1e3) :
  new Date(ts / 1e6)

const Converter = () => {
  const nowTs = van.state(Math.floor(new Date().getTime() / 1e3)), date = van.state(null)
  setInterval(() => ++nowTs.val, 1000)
  const inputDom = input({type: "text", size: 25, value: nowTs.val})
  return div(
    div(b("Now: "), nowTs),
    inputDom, " ",
    button({onclick: () => date.val = tsToDate(Number(inputDom.value))}, "Convert"),
    p(i("Supports Unix timestamps in seconds, milliseconds, microseconds and nanoseconds.")),
    () => date.val ? p(
      div(date.val.toString()),
      div(b("GMT: "), date.val.toGMTString()),
    ) : p(),
  )
}

van.add(document.body, Converter())
