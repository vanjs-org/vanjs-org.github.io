import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {div, p} = tags

  const {H1} = common(doc)

  return div({id: "content"},
    H1("Convert HTML Snippet to 🍦VanJS Code"),
    p({id: "converter"}),
  )
}
