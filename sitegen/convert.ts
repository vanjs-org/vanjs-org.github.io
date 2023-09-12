import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, i, p}} = van.vanWithDoc(doc)
  const {H1, Link, VanJS} = common(doc)

  return div({id: "content"},
    H1("Convert HTML Snippet to 🍦VanJS Code"),
    i("The library version of the converter with the support of converting MD and HTML snippets to ", VanJS(), " code is ", Link("working in progress", "https://github.com/vanjs-org/van/tree/main/converter"), "."),
    p({id: "converter"}),
  )
}
