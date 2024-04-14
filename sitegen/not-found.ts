import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, p}} = van.vanWithDoc(doc)
  const {H1, Link} = common(doc)

  return div({id: "content"},
    H1("Not Found"),
    p("The page for the URL you requested can't be found. If you think this is a mistake, please file a bug ", Link("here", "https://github.com/vanjs-org/van/issues/new"), "."),
  )
}
