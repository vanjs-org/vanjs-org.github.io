import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, i, p, strong}} = van.vanWithDoc(doc)
  const {H1} = common(doc)

  return div({id: "content"},
    H1(strong("VanX")),
    p("🤫 ", i("Coming soon. Stay tuned!")),
  )
}
