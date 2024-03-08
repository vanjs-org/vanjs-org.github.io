import { Van } from "vanjs-core"
import { htmlToVanCode, mdToVanCode } from "vanjs-converter"

declare const van: Van, Prism: any

const {state, derive, add, tags: {code, div, h5, input, option, pre, select, span, textarea}} = van

const autogrow = (dom: HTMLTextAreaElement) => {
  dom.style.height = "5px"
  dom.style.height = (dom.scrollHeight + 5) + "px"
}

const Converter = () => {
  const inputType = state("HTML")
  const isHtml = derive(() => inputType.val === "HTML")

  const htmlInput = state('<div><p>👋Hello</p><ul><li>🗺️World</li><li><a href="https://vanjs.org/">🍦VanJS</a></li></ul></div>')
  const mdInput = state(`👋Hello
* 🗺️World
* [🍦VanJS](https://vanjs.org/)
`)
  const currentInput = derive(() => (isHtml.val ? htmlInput : mdInput).val)

  const inputDom = textarea({
    style: "width: 100%;",
    oninput: e => (isHtml.val ? htmlInput : mdInput).val = e.target.value,
    value: currentInput,
  })
  derive(() => (currentInput.val, setTimeout(autogrow.bind(null, inputDom), 5)))

  const indent = state(2), spacing = state(false), skipEmpty = state(false)
  const err = state("")

  const result = derive(() => {
    err.val = ""
    try {
      return isHtml.val ?
        htmlToVanCode(htmlInput.val,
          {indent: indent.val, spacing: spacing.val, skipEmptyText: skipEmpty.val}) :
        mdToVanCode(mdInput.val, {indent: indent.val, spacing: spacing.val})
    } catch (e) {
      err.val = (<any>e).toString()
    }
  })

  const showForHtml = () => isHtml.val ? "" : "display: none"

  return div(
    h5(
      "Paste your ",
      select({value: inputType, oninput: e => inputType.val = e.target.value},
        option("HTML"), option("MD")),
      " snippet here:",
    ),
    div(inputDom),
    div(
      "Indent level: ", input({type: "number", min: 1, max: 8, value: indent,
        oninput: e => indent.val = e.target.value}), " ",
      input({type: "checkbox", value: spacing, oninput: e => spacing.val = e.target.checked}),
      "Spacing ",
      span({style: showForHtml},
        input({type: "checkbox", value: skipEmpty, oninput: e => skipEmpty.val = e.target.checked}),
        "Skip empty text "
      ),
    ),
    pre({class: "err"}, err),
    (dom?: Element) => {
      if (!result.val) return div()
      if (!dom?.hasChildNodes()) dom = div(
        h5("Importing:"),
        pre(code({class: "language-js"})),
        h5("Building the DOM tree:"),
        pre(code({class: "language-js"})),
      )
      const {code: lines, tags} = result.val
      const space = spacing.val ? " " : ""
      const [tagsDom, codeDom] = dom.querySelectorAll("pre code[class='language-js']")
      tagsDom.textContent = tags.length ? `const {${space}${tags.join(", ")}${space}} = van.tags
` : ""
      codeDom.textContent = lines.map(l => l + "\n").join("")
      setTimeout(() => Prism.highlightAll(), 5)

      return dom
    }
  )
}

add(document.getElementById("converter")!, Converter())
