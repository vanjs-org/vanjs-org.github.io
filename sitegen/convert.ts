import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, i, p}} = van.vanWithDoc(doc)
  const {H1, Link, VanJS} = common(doc)

  return div({id: "content"},
    H1("HTML/MD Snippet to 🍦VanJS Code"),
    p(i("The library version of the converter with the support of custom ", VanJS(), " components is ", Link("here", "https://github.com/vanjs-org/converter"), ".")),
    p({id: "converter"}),
  )
}
