const {div} = van.tags

const data = vanX.reactive([
  vanX.noreactive(new ArrayBuffer(8)),
  vanX.noreactive(new ArrayBuffer(16)),
])

const App = () => vanX.list(div, data, v => div(v.val.byteLength))

van.add(document.body, App())
