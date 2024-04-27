const data = vanX.reactive([
  vanX.noreactive(new ArrayBuffer(8)),
  vanX.noreactive(new ArrayBuffer(16)),
])

const App = () => div(
  vanX.list(div, data, v => div(v.val.byteLength)),
  div(button({onclick: () => data.push(vanX.noreactive(new ArrayBuffer(24)))}, "Push")),
)
