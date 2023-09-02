import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, p}} = van.vanWithDoc(doc)
  const {H1, VanJS} = common(doc)

  return div({id: "content"},
    H1(VanJS(), ": Fullstack Rendering (SSR, CSR and Hydration)"),
    p("⌛ Coming soon. Stay tuned!"),
  )
}
