import van from "/code/van-latest.min.js"

const {code, div, h5, input, pre, textarea} = van.tags

const quoteIfNeeded = key => /^[a-zA-Z_][a-zA-Z_0-9]+$/.test(key) ?
  key : `"${key}"`

const attrsToVanCode = dom => dom.attributes.length > 0 ?
  `{${[...dom.attributes].map(
    a => `${quoteIfNeeded(a.nodeName)}: ${JSON.stringify(a.nodeValue)}`)
    .join(", ")}}${dom.childNodes.length > 0 ? "," : ""}` : ""

const filterChild = (childNodes, {skipEmptyText}) =>
  [...childNodes].filter(c =>
    !skipEmptyText || c.nodeName !== "#text" || /\S/.test(c.nodeValue))

const numRows = s => (s.match(/\n/g)?.length ?? 0) + 1

const domToVanCode = (dom,
  {indent = 0, indentLevel, skipEmptyText, skipTrailingComma},
  tagsUsed) => {
  const prefix = " ".repeat(indent)
  const suffix = skipTrailingComma ? "" : ","
  if (dom.nodeName === "#text")
    return [`${prefix}${JSON.stringify(dom.nodeValue)}${suffix}`]
  const lowerCaseTagName = dom.nodeName.toLowerCase()
  tagsUsed.add(lowerCaseTagName)
  if (lowerCaseTagName === "pre") skipEmptyText = false
  return [
    `${prefix}${lowerCaseTagName}(${attrsToVanCode(dom)}`,
    ...filterChild(dom.childNodes, {skipEmptyText}).flatMap(c =>
      domToVanCode(
        c, {indent: indent + indentLevel, indentLevel, skipEmptyText},
        tagsUsed)),
    `${prefix})${suffix}`,
  ]
}

const Converter = ({initInput}) => {
  const oninput = () => {
    textareaDom.rows = Math.max(numRows(textareaDom.value) + 2, 5)
    const containerDom = div()
    containerDom.innerHTML = textareaDom.value
    const tagsUsed = new Set;
    const childNodes = filterChild(containerDom.childNodes,
      {skipEmptyText: skipEmptyTextDom.checked})
    const lines = childNodes.flatMap(c =>
      domToVanCode(c, {
        indentLevel: parseInt(indentInputDom.value),
        skipEmptyText: skipEmptyTextDom.checked,
        skipTrailingComma: childNodes.length <= 1
      }, tagsUsed))
    const sortedTags = [...tagsUsed].sort()
    tagsCode.val = `const {${sortedTags.join(", ")}} = tags`
    domCode.val = lines.join("\n")
    setTimeout(() => Prism.highlightAll(), 5)
  }

  const textareaDom = textarea(
    {rows: 5, oninput, style: "width: 100%;"}, initInput)
  const indentInputDom = input(
    {type: "number", min: "1", max: "8", value: "2", oninput})
  const skipEmptyTextDom = input({type: "checkbox", oninput})
  const tagsCode = van.state(""), domCode = van.state("")

  // Trigger the UI update after initialization
  textareaDom.dispatchEvent(new Event("input"))
  return div(
    h5("Paste your HTML snippet here:"),
    textareaDom,
    "Indent level: ", indentInputDom, " ",
    skipEmptyTextDom, "Skip empty text",
    h5("Declaring tag functions:"),
    van.bind(tagsCode, c => div(pre(code({ class: "language-js" }, c)))),
    h5("Building the DOM tree:"),
    van.bind(domCode, c => div(pre(code({ class: "language-js" }, c)))),
  )
}

const converter = Converter({
  initInput: `<div><p>👋Hello</p><ul><li>🗺️World</li><li><a href="https://vanjs.org/">🍦VanJS</a></li></ul></div>`})
document.getElementById("converter").appendChild(converter)
