import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, li, ol, p, ul}} = van.vanWithDoc(doc)
  const {H1, H2, Link, MiniVan, VanJS} = common(doc)

  const codeUrlBase = "https://github.com/vanjs-org/vanjs-org.github.io/tree/hydrate/hydration-example"

  return div({id: "content"},
    H1(VanJS(), ": Fullstack Rendering (SSR, CSR and Hydration)"),
    p(VanJS(), " offers a seamless and framework-agnostic solution for fullstack rendering. We will provide a walkthrough for a sample application with SSR (server-side rendering), CSR (client-side rendering) and hydration. As a outline, here are the major steps we're going to take for building the sample application:"),
    ol(
      li("Define common UI components that can be shared on both server-side and client-side."),
      li("Implement server-side script with the help of ", MiniVan(), " for serving the HTML file to the end user."),
      li("Implement client-side script with the help of ", VanJS(), " for adding client-side components and enabling hydration."),
    ),
    p("The sample application requires a bare minimum of dependencies. The server-side script can be run by Node.js. We can also build a fullstack application with other JavaScript runtimes like Deno or Bun. Other front-end frameworks like Vite or Astro is not required, but it should be easy to integrate with them."),
    p("The source code of the sample application can be found ", Link("here", codeUrlBase), " with the following directory structure:"),
  )
}
